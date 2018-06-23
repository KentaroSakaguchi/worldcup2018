/**
 * @file stylelint実行ファイル
 *
 */

const stylelint = require('stylelint');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const chokidar = require('chokidar');
const config = require('./setting.config');

const stylelintConfig = path.join(__dirname, '.stylelintrc.json');

/**
 * stylelintの実行
 */
const startStyleLint = () => {

  stylelint.lint({
    configFile: stylelintConfig,
    files: `${config.devDir}/styles/**/*.scss`,
    syntax: 'scss',
    formatter: 'string'
  }).then((data) => {
  
    if (data.output.length) {
      console.log(chalk.red.bold('cssの構文エラーです'));
      console.log(data.output);
    } else {
      console.log(chalk.gray('linting finish'));
    }
  
  })
  .catch((err) => {
    console.error(err.stack);
  });
  
}

/**
 * sassファイルの監視
 */
const watchSass = () => {

  const targetPath = 'app/styles/**';
  const chokidarWatch = chokidar.watch(targetPath, {
    ignoreInitial: true, // ファイルやフォルダの監視開始時にaddイベントやaddDirイベントを発生させない。
    awaitWriteFinish: { // ファイルに対する変更が完了したと思われるまでaddイベントやchangeイベントの発生を遅らせる
      stabilityThreshold: 2000, // ファイルに対する変更が完了したと判断するまでの時間
      pollInterval: 100 // ファイルに対する変更が完了したかを確認する間隔
    }
  });

  chokidarWatch.on('change', (path) => {
    startStyleLint();
  }).on('add', (path) => {
    startStyleLint();
  }).on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

};

// watchする
if (config.modeFlg) {
  watchSass();
} else {
  startStyleLint();
}

// 終了処理
process.on('SIGINT', () => {
  process.exit(0);
});
