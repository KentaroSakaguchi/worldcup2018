/**
 * @file puglint実行ファイル
 *
 */

const puglint = require('pug-lint');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const chokidar = require('chokidar');
const config = require('./setting.config');

const puglintConfig = path.join(__dirname, '.pug-lintrc');

puglint({
  configFile: puglintConfig
});
