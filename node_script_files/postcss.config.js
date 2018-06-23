/**
 * @file CSS 設定ファイル
 *
 */

const postcss = require('postcss');
const postcssNested = require('postcss-nested');
const cssnano = require('cssnano');
const postcssImport = require('postcss-import');
const postcssEasyImport = require('postcss-easy-import');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssMixins = require('postcss-mixins');
const postcssReporter = require('postcss-reporter');
const autoprefixer = require('autoprefixer');
const postcssCalc = require('postcss-calc');
const postcssHexRgba = require('postcss-hexrgba')
const sprites = require('postcss-sprites');
const styleguide = require('postcss-style-guide');


const chalk = require('chalk');
const config = require('./setting.config');

// プレフィックス
const prefixSetting = [
  'last 2 versions',
  '> 2%'
];


// 使用プラグイン
const initPlugin = [

  postcssEasyImport({
    extensions: ['.scss']
  }),
  postcssSimpleVars(),
  postcssMixins({ silent: true }),
  postcssHexRgba(),
  postcssNested(),
  postcssCalc({ mediaQueries: true }),
  autoprefixer({
    browsers: prefixSetting
  }),
  sprites({
    stylesheetPath: config.envFlg ? './dist/styles/' : './build/styles/', // cssファイルのパス
    spritePath: config.envFlg ? './dist/images/' : './build/images/', // sprite画像の出力先
    filterBy: function(image) {

      // console.log(image);
      image.ratio = 2; // 画像の50%のサイズで表示する
      
      if (image.originalUrl.indexOf('images') > 0) {
        // 画像パスがimagesの場合はスプライトにしない。
        return Promise.reject();
      } else {
        return Promise.resolve();
      }

    },
    spritesmith: {
      padding: 10 // 画像と画像の余白
    },
  }),
  styleguide({
    project: 'styleguide',
    dest: `${config.distDir}/styleguide.html`,
    showCode: false
  })
];


// 本番時
if (!config.envFlg) {
  initPlugin.push(cssnano()); // cssを圧縮する
}

// 実行時のメッセージ
console.log(chalk.blue.bold('scss -> compile finish'));

// 終了処理
process.on('SIGINT', () => {
  process.exit(0);
});

// 実行
module.exports = {
  syntax: 'postcss-scss',
  map: config.envFlg, // 開発時のみ
  plugins: initPlugin
};
