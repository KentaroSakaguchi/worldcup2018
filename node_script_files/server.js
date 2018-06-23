/**
 * @file ローカルサーバー設定ファイル
 *
 */

const browserSync = require('browser-sync');
const fs = require('fs-extra');
const chokidar = require('chokidar');
const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
const config = require('./setting.config');

browserSync({

  server: {
    baseDir: 'dist',
  },
  port: 8000,
  https: false,
  notify: false,
  open: false,
  reloadOnRestart: true // サーバーが再起動したときにリロードする

});

/**
 * ファイルを監視して変更があったらreloadする
 * @param {Array(string)} _targetPath コンパイルするファイル名
 */
const chokidarWatch = chokidar.watch('dist', {
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  }
});

chokidarWatch.on('change', (path) => {

  console.log(chalk.yellow(`filechange -> ${path}`));
  browserSync.reload();

}).on('error', (err) => {
  console.error(err);
  process.exit(1);
});

// 終了処理
process.on('SIGINT', () => {
  console.log('\nタスクが終了されました。');
  process.exit(0);
});
