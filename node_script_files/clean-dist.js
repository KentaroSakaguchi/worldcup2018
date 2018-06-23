/**
 * @file 起動時distフォルダを空にする
 *
 */

const fs = require('fs-extra');
const chalk = require('chalk');

try {

  fs.accessSync('dist'); // フォルダの有無を調べる
  console.log(chalk.underline.magenta('clean -> dist'));
  fs.emptyDirSync('dist'); // フォルダをからにする
  return true

} catch(err) {

  // フォルダが無いときはフォルダを作成する
  console.log(chalk.underline.magenta('mkdir -> dist'));
  fs.mkdirSync('dist');
  return false

}
