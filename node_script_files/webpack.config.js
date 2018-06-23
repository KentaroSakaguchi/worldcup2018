/**
 * @file webpack設定ファイル
 *
 */

const path = require('path');
const glob = require('glob');

const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const config = require('./setting.config');
const eslintrc = path.join(__dirname, '.eslintrc');

// 出力パス
let outputPass = '';
if (config.envFlg) {
  outputPass = 'dist'
} else {
  outputPass = 'build'
}

const webpackConfig = [

  {
    mode: process.env.NODE_ENV,
    devtool: 'inline-source-map',

    // 読み込み元
    entry: {
      common: `${config.devDir}/scripts/common/common.js`
    },

    // 吐き出し先
    output: { 
      path: path.join(__dirname, '..', outputPass, 'scripts'),
      filename: '[name].js'
    },

    module: {
      rules: [
        // jsの設定
        {
          // eslint
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            configFile: eslintrc
          }
        },
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              // Babel
              loader: 'babel-loader',
              options: {
                presets: [
                  // env : ES2017 → ES5
                  ['env', {'modules': false}],
                  'react'
                ]
              }
            }
          ],
          // node_modules は除外
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          // TypeScript をコンパイルする
          use: 'ts-loader'
        }
      ]
    },

    resolve: { // 下記の拡張子のentryからimportされているファイルをくっつける
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },

    optimization: { // ライブラリを別ファイルでまとめる
      splitChunks: {
        name: 'vendor',
        chunks: 'initial'
      }
    },

    externals: {
      jquery: 'jQuery'
    },

    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]

  }
];


/**
 * 個別ページ用のjsの処理
 * ファイル名を取得してentryに追加していく
 */

const pagesJs = glob.sync(`${config.devDir}/scripts/pages/*`);　// 個別ページ用のjsfiles
// 個別ページ用のjsファイル名を取得
for (data of pagesJs) {
  const pageJsFile = data.replace(`${config.devDir}/scripts/pages/`, '');
  const filename = pageJsFile.replace(/\.(js|jsx)$/, '');
  console.log(filename);
  webpackConfig[0].entry[filename] = data;
}

// 終了処理
process.on('SIGINT', () => {
  process.exit(0);
});

module.exports = webpackConfig;
