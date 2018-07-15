import React, { Component } from 'react';
import PropTypes from 'prop-types';


class TeamList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.param = this.param.bind(this);
  }

  // パラメータを付与
  param(event) {
    event.preventDefault();
    const setParam = event.target.dataset.key;
    history.pushState(null, null, `?Team=${setParam}`);
    this.setState({title: setParam});

    this.props.teamPramProp(`?Team=${setParam}`);
  }

  list() {
    if (typeof this.props.teamListProp === 'object') {

      const teamlist = this.props.teamListProp.map((element, index, array) => {
      return (
          <li key={index} className="team__item">
            <a href="#" className="team__link" onClick={this.param} data-key={index} >{element}</a>
          </li>
        );
      });
      return teamlist;
    } else {
      return;
    }
  }

  render() {
    return (
      <ul className="team__list">
        {this.list()}
      </ul>
    );
  }
}


export default TeamList;
