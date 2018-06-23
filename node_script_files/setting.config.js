
/**
 * @file パス情報など
 *
 */

const path = require('path');

const rootDir = path.resolve(__dirname, path.join(__dirname, '../')); // rootパス
const devDir = path.resolve(__dirname, path.join(__dirname, '../app')); // 開発用
const distDir = path.resolve(__dirname, path.join(__dirname, '../dist')); // 開発用
const prdDir = path.resolve(__dirname, path.join(__dirname, '../build')); // 公開用

// 環境判定フラグ 開発時:true 本番:falase
const envFlg = process.env.NODE_ENV === 'development' ? true : false;

// watchモード判定フラグ
const modeFlg = process.env.NODE_MODE === 'watching' ? true : false;

module.exports = {
  rootDir,
  devDir,
  distDir,
  prdDir,
  envFlg,
  modeFlg
};