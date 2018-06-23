/**
 * @file 全ページ 共通で使用するjsファイル
 *
 */
import React from 'react';
import ReactDOM from 'react-dom';

// import picturefill from 'picturefill'; // pictureタグのpolyfill(ie11など用)

// import ExAnzu from '../modules/Anzu';
// import AnzuTsEx from '../modules/AnzuTs';

import Title from '../component/Title';
import Nav from '../component/Nav';

import Search from '../component/Search';

// import Mount from '../component/Mount';

const title = document.getElementById('js-title');

ReactDOM.render(
  <Title />, title
);

const nav = document.getElementById('js-nav');

ReactDOM.render(
  <Nav />, nav
);

const searchElement = document.getElementById('js-search');

if ([searchElement][0] !== null) {
  ReactDOM.render(
    <Search />, searchElement
  );
}

const mount = document.getElementById('js-mount');

if ([mount][0] !== null) {
  ReactDOM.render(
    <Mount />, mount
  );
}

// ExAnzu.static();

// const anzu = new ExAnzu('input: az');
// anzu.funcEx();

// const anzuTs = new AnzuTsEx('input: azTs');
// anzuTs.funcEx();
// console.log(anzuTs);


const loader = document.getElementById('js-loader');

window.addEventListener('load', () => {

  loader.style.opacity = 0;

  setTimeout(() => {
    loader.style.display = 'none';
  }, 0.35);
});
