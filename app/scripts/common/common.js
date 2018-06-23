/**
 * @file 全ページ 共通で使用するjsファイル
 *
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


// import picturefill from 'picturefill'; // pictureタグのpolyfill(ie11など用)

// import ExAnzu from '../modules/Anzu';
// import AnzuTsEx from '../modules/AnzuTs';
import Spred from '../modules/Spred';
Spred.AnzuSpred();

import Nav from '../component/nav/Nav';
import Search from '../component/search/Search';
import Team from '../component/team/Team';

// import Mount from '../component/Mount';
class App extends Component {

  render() {
    return(
      <div className="app">
        <Nav />
        <Search />
        <Team />
      </div>
    )
  }

}

ReactDOM.render(
  <App />, document.getElementById('js-app')
);

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
