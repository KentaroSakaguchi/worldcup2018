/**
 * @file 静的ファイル各フォルダへ移動
 *
 */

const fs = require('fs-extra');
const glob = require('glob');
const config = require('./setting.config');

// libの出力先
let distPath = '';
if (config.envFlg) {
  distPath = 'dist/scripts';
} else {
  distPath = 'build/scripts';
}

// 対象ファイル
const libFiles = glob.sync(`${config.devDir}/scripts/lib/*`);

/**
 * ファイルをコピーしてdist or buildフォルダに移動する
 * @param {Array(string)} _libFiles ファイル名
 */
const libCopy = (_libFiles) => {

  for (data of libFiles) {
    // libのファイル名を取得
    const libfileName = data.replace(`${config.devDir}/scripts/lib/`, '');
    fs.copySync(data, `${distPath}/${libfileName}`);

    console.log(`copy -> ${distPath}/${libfileName} -> finish`);
  }

}

libCopy();


// jsonの出力先
let jsonDistPath = '';
if (config.envFlg) {
  jsonDistPath = 'dist/json';
} else {
  jsonDistPath = 'build/json';
}

// 対象ファイル
const jsonFiles = glob.sync(`${config.devDir}/json/*.json`);

/**
 * ファイルをコピーしてdist or buildフォルダに移動する
 */
const jsonCopy = () => {

  for (data of jsonFiles) {
    // jsonファイル名を取得
    const jsonfileName = data.replace(`${config.devDir}/json/`, '');
    fs.copySync(data, `${jsonDistPath}/${jsonfileName}`);

    console.log(`copy -> ${jsonDistPath}/${jsonfileName} -> finish`);
  }

}

jsonCopy();


// fontsの出力先
let fontsDistPath = '';
if (config.envFlg) {
  fontsDistPath = 'dist/fonts';
} else {
  fontsDistPath = 'build/fonts';
}

// 対象ファイル
const fontsFiles = glob.sync(`${config.devDir}/fonts/*`);

/**
 * ファイルをコピーしてdist or buildフォルダに移動する
 */
const fontsCopy = () => {

  for (data of fontsFiles) {
    // fontsファイル名を取得
    const fontsfileName = data.replace(`${config.devDir}/fonts/`, '');
    fs.copySync(data, `${fontsDistPath}/${fontsfileName}`);

    console.log(`copy -> ${fontsDistPath}/${fontsfileName} -> finish`);
  }

}

fontsCopy();

// 終了処理
process.on('SIGINT', () => {
  process.exit(0);
});
