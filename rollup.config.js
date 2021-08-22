import pkg from './package.json';

export default {
  input: 'index.js',
  external: Object.keys(pkg.dependencies),
  output: {
    file: pkg.main,
    format: 'cjs',
		exports: 'default'
  }
}