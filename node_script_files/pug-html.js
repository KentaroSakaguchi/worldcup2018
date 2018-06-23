/**
 * @file pug設定ファイル
 *
 */

const pug = require('pug');
const fs = require('fs-extra');
const chokidar = require('chokidar');
const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
const config = require('./setting.config');

// pugの設定情報
const pugOptions = {
  pretty: true,
  locals: {

  }
};

// pugの出力先
let passName = '';

if (config.envFlg) {
  passName = 'dist';
} else {
  passName = 'build';
}

const outputPass = path.join(__dirname, '..', passName);


// pug files
const pugFiles = glob.sync(`${config.devDir}/views/!(_|index)*.pug`);

/**
 * pugファイルのコンパイル
 * @param {Array(string)} pugFilesList コンパイルするファイル名
 */

const pugCompile = (pugFilesList) => {
  
  for (data of pugFilesList) {

    // pugのファイル名を取得
    const pugfileName = data.replace(`${config.devDir}/views/`, '');
    // 拡張子を除去
    const filename = pugfileName.replace(/\.(pug)$/, '');

    console.log(chalk.underline.gray(`compile start -> ${pugfileName}`));

    try {
      // compile
      const fn = pug.compileFile(data, pugOptions); // pugファイルをコンパイル
      const html = fn(pugOptions.locals); // コンパイル結果
      fs.writeFileSync(`${outputPass}/${filename}.html`, html, {
        encoding: 'utf-8'
      });

      console.log(chalk.green(`compile finish   -> ${filename}.html`));

    } catch (err) {
      // compileエラー
      console.log(err);
      console.log(chalk.red.bold(`${pugfileName}がエラーです。`));
    }

  }
}


/**
 * pugファイルの監視
 */
const watchPug = () => {

  const targetPath = 'app/views';
  const chokidarWatch = chokidar.watch(targetPath, {
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100
    }
  });


  /**
   * 監視ファイルのコンパイル実行
   * ページファイルに変更があった場合は変更のあったページのみコンパイル
   * パーツファイルに変更があった場合はページファイルすべてをコンパイル
   * @param {String} _path 変更が行われたファイルのパス
   */
  const pageFileChange = (_path) => {

    let changeFiles = [];

    if (_path.indexOf('/_') > 0) {

      // パーツファイルの更新
      changeFiles = glob.sync(`${config.devDir}/views/!(_|index)*.pug`); // ページファイル全てを取得しpugCompile()へ

      // パーツファイルのエラーチェック
      try {

        // パーツファイルのコンパイル
        const fnParts = pug.compileFile(_path, pugOptions);
        const htmlParts = fnParts(pugOptions.locals); 

      } catch (err){

        console.log(err);
        console.log(chalk.red.bold(`${_path}がエラーです。`));
        return;
      }

    } else {

      // ページファイルの更新
      changeFiles.push(`${config.rootDir}/${_path}`); // 変更のあったページファイルのみ取得しpugCompile()へ
    }

    pugCompile(changeFiles);

  };

  chokidarWatch.on('change', (path) => {

    if(path.indexOf('.DS_Store') >= 0) {
      return;
    } else {
      pageFileChange(path);
    }

  }).on('add', (path) => {

    if(path.indexOf('.DS_Store') >= 0) {
      return;
    } else {
      pageFileChange(path);
    }

  }).on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

};

pugCompile(pugFiles);　// 初回コンパイル実行

// watchする
if (config.modeFlg) {
  watchPug();
}

// 終了処理
process.on('SIGINT', () => {
  process.exit(0);
});
