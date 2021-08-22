import { join } from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import Prerenderer from '@prerenderer/prerenderer';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';

export default (userConfig = {}) => {
	const config = {
		routes: ['/'],
		hook: 'closeBundle',
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
				writeFileSync(outputFile, renderedRoute.html.trim());
			}
			prerenderer.destroy();
			return null;
		},
	};
};
