import React, { Component } from 'react';
import PropTypes from 'prop-types';


class TeamMenber extends Component {

  constructor(props) {
    super(props);
  }

  list() {
    if (typeof this.props.teamMenberProp === 'object') {
      console.log(this.props.teamMenberProp);

      const teamlist = this.props.teamMenberProp.map((element, index, array) => {
        return (
            <li key={index} className="menber__item">
              <dl className="menber__data-list">
                <dt className="menber__data menber__data--number">No.{element.number}</dt>
                <dd className="menber__data menber__data--name">{element.name}</dd>
                <dd className="menber__data">{element.body}g</dd>
                <dd className="menber__data">{element.team}</dd>
                <dd className="menber__background">{element.number}</dd>
              </dl>
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
      <ul className="menber__list">{ this.list() }</ul>
    );
  }
}


export default TeamMenber;
