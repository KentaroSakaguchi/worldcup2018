/**
 * @file 画像圧縮ファイル
 *
 */

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const chokidar = require('chokidar');
const fs = require('fs-extra');
const glob = require('glob');
const config = require('./setting.config');

// 画像の出力先
let distPath = '';
if (config.envFlg) {
  distPath = 'dist/images';
} else {
  distPath = 'build/images';
}

// 対象画像ファイル
let targetPath = [`${config.devDir}/images/*.{jpg,png}`]

/**
 * 画像圧縮
 * @param {Array(string)} _targetPath コンパイルするファイル名
 */

const imageminFunc = (_targetPath) => {

  imagemin(_targetPath, distPath, {
    plugins: [
      imageminJpegtran(),
      imageminPngquant({quality: '65-80'}),
    ]
  }).then(files => {
    console.log('imagemin -> finish');
  });

}


const svgFiles = glob.sync(`${config.devDir}/images/!(_)*.svg`); // svgファイル名を取得

/**
 * svgファイルの処理
 * ファイルをコピーしてdist or buildフォルダに移動する
 * @param {Array(string)} _svgFiles コンパイルするファイル名
 */
const svgCopy = (_svgFiles) => {

  for (data of svgFiles) {
    // svgのファイル名を取得
    const svgfileName = data.replace(`${config.devDir}/images/`, '');
    fs.copySync(data, `${distPath}/${svgfileName}`);
  }

}

/**
 * 画像ファイルの監視
 */
const watchImg = () => {

  const chokidarWatch = chokidar.watch(`${config.devDir}/images/`, {
    ignoreInitial: true, // ファイルやフォルダの監視開始時にaddイベントやaddDirイベントを発生させない。
    ignored: `${config.devDir}/images/.DS_Store`,
    awaitWriteFinish: { // ファイルに対する変更が完了したと思われるまでaddイベントやchangeイベントの発生を遅らせる
      stabilityThreshold: 2000, // ファイルに対する変更が完了したと判断するまでの時間
      pollInterval: 100 // ファイルに対する変更が完了したかを確認する間隔
    } 
  });

  chokidarWatch.on('change', (path) => {
  
    if (path.indexOf('.svg') > 0) {
      svgCopy([path]);
    } else {
      imageminFunc([path]);
    }
  
  }).on('add', (path) => {

    if (path.indexOf('.svg') > 0) {
      svgCopy([path]);
    } else {
      imageminFunc([path]);
    }

  }).on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

};


// watchする
if (config.modeFlg) {
  watchImg();
}

// 初回実行関数
imageminFunc(targetPath);
if (svgFiles.length) {
  svgCopy(svgFiles);
}

// 終了処理
process.on('SIGINT', () => {
  process.exit(0);
});
