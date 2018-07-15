import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Input from './component/Input';
import Result from './component/Result';

const json = './json/world.json';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '', // jsonの結果
      search: '', // 検索用value
      input: '', // inputの値
      result: '',
      loader: true
    };

    this.getJson();
    this.inputValue = this.inputValue.bind(this);
  }

  getJson() {

    axios
      .get(json)
      .then((results) => {
          this.setState({
            data: results.data.football,
            search: results.data.football
          });
        }
      ).catch((results) => {
        // console.log(results.statusText);
        // console.log(results.status);
      });

  }

  searching(_value) {

    let textArray = [];

    this.state.data.find((element, index) => {

      // if (element.date.indexOf(_value) >= 0) {
      //   textArray.push(element.date);
      //   nullFlg = false;
      // }

      element.sub.find((subElement, subIndex) => {

        if (subElement.indexOf(_value) >= 0) {

          const setText = [
            element.game[subIndex], 
            element.date, 
            element.time[subIndex],
            element.tv[subIndex],
            element.result[subIndex]
          ];

          textArray.push(setText);

          if (element.group !== undefined) {
            setText.push(element.group[subIndex]);
          } else {
            setText.push(element.status);
          }
        }
      });

      // if (element.status && element.status.indexOf(_value) >= 0) {
      //   textArray.push(element.status);
      //   nullFlg = false;
      // }

      // console.log(textArray);
      this.setState({
        result: textArray,
        loader: false
      });

    });
  }

  inputValue(value) {
    this.setState({
      input: value,
      loader: true
    });
    this.searching(value.toLowerCase()); // 入力値を小文字に変換し小文字でソートさせる
    return this.state.input
  }

  render() {
    return (
      <div className="search">
        <Input inputProp={this.inputValue} />
        <Result
          resultProp={this.state.input}
          resultPropText={this.state.result}
          resultPropLoader={this.state.loader}
        />
      </div>
    );
  }
}

Search.defaultProps = {
  data: null,
  search: null
};

Search.propTypes = {
  data: PropTypes.array,
  search: PropTypes.array,
  inputProp: PropTypes.func,
  resultProp: PropTypes.string
}

export default Search;
