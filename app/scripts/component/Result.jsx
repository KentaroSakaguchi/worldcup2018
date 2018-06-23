import React, { Component } from 'react';

class Result extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaderClassName: 'result__loader-box'
    }
    // this.loader = this.loader.bind(this);
  }

  // loader() {
  //   if (this.props.resultPropLoader) {
  //     this.setState({ loaderClassName: 'result__loader-box' });
  //   } else {
  //     this.setState({ loaderClassName: 'result__loader-box is-hide' });
  //   }
  //   return this.state.loaderClassName;
  // }

  result() {
    let resultList = null;

    if (typeof this.props.resultPropText === 'object') {

      resultList = this.props.resultPropText.map((element, index, array) => {
        return (
          <div key={index} className="result__block-text">
            <dl className="result__block-info">
              <dt className="result__block-list">
                <span className="result__block-head">グループ:</span>
                <span className="result__block-data">{element[5]}</span>
              </dt>
              <dt className="result__block-list">
                <span className="result__block-head">試合:</span>
                <span className="result__block-data">{element[0]}</span>
              </dt>
              <dt className="result__block-list">
                <span className="result__block-head">日程:</span>
                <span className="result__block-data">{element[1]}</span>
              </dt>
              <dt className="result__block-list">
                <span className="result__block-head">試合時間:</span>
                <span className="result__block-data">{element[2]}</span>
              </dt>
              <dt className="result__block-list">
                <span className="result__block-head">放送局:</span>
                <span className="result__block-data">{element[3]}</span>
              </dt>
              <dt className="result__block-list">
                <span className="result__block-head">試合結果:</span>
                <span className="result__block-data">{element[4]}</span>
              </dt>
            </dl>
          </div>
        );
      });

    } else {
      resultList = <div className="result__block-text"></div>;
    }

    return resultList;

  }

  render() {
    return (
      <div className="result">
        {/* <div className={this.loader}><i className="loader"></i></div> */}
        <p className="result__text"><span className="result__text-word">検索ワード:</span><span className="result__text-word">{this.props.resultProp}</span></p>
        <div className="result__block">
          {this.result()}
        </div>
      </div>
    )
  }
}

export default Result;
