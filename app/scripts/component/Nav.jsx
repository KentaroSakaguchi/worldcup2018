import React, { Component } from 'react';

class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Schedule'
    };

    this.param = this.param.bind(this);
  }

  param(event) {
    event.preventDefault();
    const setParam = event.target.innerText;
    history.pushState(null, null, setParam);
    this.setState({title: setParam})
  }
  
  render() {
    return(
      <ul className="menu__list">
        <li className="menu__item">
          <a className="menu__link js-nav-link" href="#" onClick={this.param}>Schedule</a>
        </li>
        <li className="menu__item">
          <a className="menu__link js-nav-link" href="#" onClick={this.param}>Team</a>
        </li>
        <li className="menu__item">
          <a className="menu__link js-nav-link" href="#" onClick={this.param}>Ranking</a>
        </li>
      </ul>
    );
  }
}

export default Nav;