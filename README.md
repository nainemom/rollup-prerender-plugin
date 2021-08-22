# Rollup Prerender Plugin
![npm](https://img.shields.io/npm/dm/rollup-prerender-plugin)
![npm](https://img.shields.io/npm/v/rollup-prerender-plugin)
![npm](https://img.shields.io/npm/l/rollup-prerender-plugin)

A small Rollup plugin to prerender output.

## Install

```bash
npm i -D rollup-prerender-plugin
```

## Usage
```javascript
// rollup.config.js
import prerender from 'rollup-prerender-plugin'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    prerender({})
  ]
}
```

### Options

### `routes`

Type: `String` | `Array[...String]`

Default: `['/']`

List of prerendering routes.

### `hook`

Type: `String`

Default: `'closeBundle'`

Rollup [build hook](https://github.com/rollup/rollup/blob/master/docs/05-plugin-development.md#build-hooks) to run the action.

### `puppeteer`

Type: `Object`

Default: `{}`

[@prerenderer/renderer-puppeteer](https://github.com/JoshTheDerf/prerenderer#prerendererrenderer-puppeteer-options) options.
