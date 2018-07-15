import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import TeamList from './component/Teamlist';
import TeamMenber from './component/TeamMenber';

const path = './json/'
const json = `${path}team_name.json`;

const teamJsonListLength = 32;
const teamJsonList = [];
for (let i = 0; i < teamJsonListLength; i++) {
  teamJsonList.push(`${i}.json`);
}

class Team extends Component {

  constructor(props) {
    super(props);
    this.state = {
      team: '',
      param: location.search,
      teamNumber: 0,
      teamMenber: '',
      teamFlg: false
    };

    this.getJson();
    this.getTeamJson(this.state.teamNumber);
    this.checkParam = this.checkParam.bind(this);
    this.closeButton = this.closeButton.bind(this);
  }

  getJson() {

    axios
      .get(json)
      .then((results) => {
          this.setState({
            team: results.data.teamname
          });
        }
      ).catch((results) => {
        // console.log(results.statusText);
        // console.log(results.status);
      });

  }

  getTeamJson(teamNumber) {
    axios
      .get(path + teamJsonList[teamNumber])
      .then((results) => {
          this.setState({
            teamMenber: results.data.team
          });
        }
      ).catch((results) => {
        // console.log(results.statusText);
        // console.log(results.status);
      });

  }

  checkParam() {

    const loc = location.search;

    if (loc.indexOf('=') > 0) {

      const teamNumber = loc.replace('?Team=', '')
      this.setState({
        param: loc,
        teamNumber: teamNumber,
        teamFlg: true
      });
      this.getTeamJson(teamNumber);
    }
  }

  closeButton() {
    this.setState({
      teamFlg: false
    });
  }


  render() {
    return (
      <div className="team">
        <TeamList teamListProp={this.state.team} teamPramProp={this.checkParam}/>
        {(() => {
          if (this.state.teamFlg) {
            return (
              <div className="menber">
                <TeamMenber teamMenberProp={this.state.teamMenber} />
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


export default Team;
