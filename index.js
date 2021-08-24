import { join } from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import Prerenderer from '@prerenderer/prerenderer';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';

export default (userConfig = {}) => {
	const config = {
		routes: ['/'],
		hook: 'writeBundle',
		removeScripts: false,
		puppeteer: {},
		...userConfig,
	};
	return {
		name: 'rollup-prerender-plugin',
		async generateBundle(options) {
			config.outputDir = options.dir;
		},
		async [config.hook]() {
			const prerenderer = new Prerenderer({
				staticDir: config.outputDir,
				renderer: new PuppeteerRenderer(config.puppeteer),
			});
			await prerenderer.initialize();
			const renderedRoutes = await prerenderer.renderRoutes(config.routes);
			for (const renderedRoute of renderedRoutes) {
				const routeOutputDir = join(config.outputDir, renderedRoute.route);
				mkdirSync(routeOutputDir, { recursive: true });
				const outputFile = join(routeOutputDir, './index.html');
				let html = renderedRoute.html.trim();
				if (config.removeScripts) {
					html = html.replace(/\<script.+\<\/script>/, '');
				}
				writeFileSync(outputFile, html);
			}
			prerenderer.destroy();
			return null;
		},
	};
};
