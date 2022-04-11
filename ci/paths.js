const path = require('path')

module.exports = {
  isAbsolute: (p) => path.isAbsolute(p),
  R: (...p) => path.resolve(...p),
  join: (...p) => path.join(...p),
  baseResovle: (...p) => path.resolve(__dirname, '..', ...p),
  htmlTemplete: (name = 'index') => path.resolve(__dirname, 'tpls', `${name}.ejs`),
  CONFIG: path.resolve(__dirname, '../config'),
  favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
  logo: path.resolve(__dirname, '../src/assets/logo.png'),
  src: path.resolve(__dirname, '../src'),
  pubdir: path.resolve(__dirname, '../public'),
  dist: path.resolve(__dirname, '../dist'),
}
