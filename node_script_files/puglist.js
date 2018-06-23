/**
 * @file pugllist
 * pugfileをlist化しindex.pugとして出力
 */

const fs = require('fs-extra');
const glob = require('glob');
const pug = require('pug');
const config = require('./setting.config');
const chalk = require('chalk');

// pugの設定情報
const pugOptions = {
  pretty: true,
  locals: {

  }
};

const pugFiles = glob.sync(`${config.devDir}/views/!(_|index)*.pug`); // pugファイルパスを取得

const mTime = []; // 保存時間
const pageTitle = []; // ファイル名
const htmlList = []; // htmlファイル名

for (data of pugFiles) {

  // pugファイル名を取得し拡張子をhtmlに
  htmlList.push(data.replace(`${config.devDir}/views/`, '').replace(/\.(pug)$/, '.html'));

  // 保存時間を取得
  const getInfo = fs.statSync(data, 'utf8');
  mTime.push(new Date(getInfo.mtime));

  // タイトルを取得
  const getTitle = fs.readFileSync(data, 'utf8');
  const searchTextA = getTitle.indexOf('title');
  const searchTextB = getTitle.indexOf('description');
  const getList = getTitle.slice(searchTextA, searchTextB);
  const sliceTextA = getList.indexOf("\'");
  const sliceTextB = getList.indexOf("\'\n");
  const makeTitle = getList.slice(sliceTextA + 1, sliceTextB);
  pageTitle.push(makeTitle);
}

// 保存時間を整形
const dates = mTime.map((arry) => {
  return {
            year: arry.getFullYear(),
            month: arry.getMonth() + 1,
            date: arry.getDate(),
          };
});

// index.pugを読み込み
let indexPugData = fs.readFileSync(`${config.devDir}/views/index.pug`, {
    encoding: 'utf-8'
}, (err, data) => {});

// index.pugにデータを送る
const result = pug.render(indexPugData, {
  files: htmlList,
  cache : false,
  dates: dates,
  titles: pageTitle,
  mode: config.envFlg ? 'develop' : 'production'
});

// html出力
if (config.envFlg) {
  // 開発時のみ
  fs.writeFileSync(`${config.distDir}/index.html`, result, 'utf8');
} else {
  // 本番時
  fs.writeFileSync(`${config.prdDir}/index.html`, result, 'utf8');
}

// 終了処理
process.on('SIGINT', () => {
  process.exit(0);
});
