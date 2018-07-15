import React, { Component } from 'react';
import PropTypes from 'prop-types';


class DataList extends Component {

  constructor(props) {
    super(props);
  }

  list() {

    const sorting = (a, b) => {

      let result = 0;

      if (a[0] < b[0]) {
        result = 1;
      } else if (b[0] < a[0]) {
        result = -1;
      }

      return result;
    }


    if (typeof this.props.allTeamProp === 'object') {

      const valueArr = [];

      Object.values(this.props.allTeamProp).map((element, index, array) => {
        valueArr.push([element]);
        return valueArr;
      });

      Object.keys(this.props.allTeamProp).map((element, index, array) => {
        valueArr[index].push(element);
        return valueArr;
      });

      const teamRank = valueArr.sort(sorting);

      const rebderRank = teamRank.map((element, index, array) => {
        return (
            <li key={index} className="menber__item-rank">
              <span className="menber__team">{element[1]}</span>
              <span className="menber__rank">{element[0]}名</span>
            </li>
          );
      });

      return rebderRank;

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


export default DataList;
