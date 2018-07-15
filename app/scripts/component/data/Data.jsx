import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Datalist from './component/Datalist';

const path = './json/';


class Data extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teamFlg: false,
      allName: '',
      allBody: '',
      allTeam: '',
      orderTeam: ''
    }

    this.teamJsonListLength = 32;
    this.teamJsonList = [];

    this.allName = [];
    this.allBody = [];
    this.allTeam = [];

    this.dataCenter();
    this.closeButton = this.closeButton.bind(this);
  }


  getAllTeamJson() {
    return new Promise((resolve, reject) => {

      for (let i = 0; i < this.teamJsonListLength; i++) {

        this.teamJsonList.push(`${i}.json`);

        axios
          .get(path + this.teamJsonList[i])
          .then((results) => {
              results.data.team.forEach((value, index, arr) => {
                this.allName.push(value.name);
                this.allBody.push(value.body);
                this.allTeam.push(value.team);

                if (i === this.teamJsonListLength - 1 && index === arr.length - 1) {
                  resolve();
                }
              });
            }
          ).catch((results) => {
            // console.log(results.statusText);
            // console.log(results.status);
          });
      }
      
    });
  }

  dataCenter() {
    this.getAllTeamJson().then(() => {
      const setAllName = this.allName;
      const setAllBody = this.allBody;
      const setAllTeam = this.allTeam;


      // previous：現在処理されている要素よりも一つ前の要素かinitialValue、もしくは一つ前の要素で実行された関数の結果
      // current：現在処理されている要素
      // index：現在処理されている要素のインデックス
      // arr：対象となっている配列
      const teamCount =  this.allTeam.reduce((previous, current, index, arr) => {
        // console.log(previous);
        // console.log(current);
        // console.log(previous[current] = (previous[current]));
        previous[current] = previous[current] ? previous[current] + 1 : 1;
        return previous;
      }, {});

      this.setState({
        allName: setAllName,
        allBody: setAllBody,
        allTeam: setAllTeam,
        orderTeam: teamCount
      });

    });

  }

  closeButton() {
    this.setState({
      teamFlg: false
    });
  }

  render() {
    return (
      <div className="team">
        <ul className="team__list">
          <li className="team__item">
            <a href="#" className="team__link" onClick={(() => { this.setState({ teamFlg: 1 }) })}>選手を一番送り出しているチームは?</a>
          </li>
        </ul>
        {(() => {
          if (this.state.teamFlg === 1) {
            return (
              <div className="menber">
                <Datalist allTeamProp={this.state.orderTeam} />
                <button className="menber__button" onClick={this.closeButton} />
              </div>
            )
          } else {
            return
          }
        })()}
      </div>
    );
  }
}


export default Data;
