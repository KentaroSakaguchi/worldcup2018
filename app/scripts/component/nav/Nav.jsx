import React, { Component } from 'react';
import Title from './component/Title';

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
    history.pushState(null, null, `?${setParam}`);
    this.setState({title: setParam});
    this.props.navProp(setParam);
  }
  
  render() {
    return(
      <div className="menu">
        <Title 
          titleProp={this.state.title}
        />
        <ul className="menu__list">
          <li className="menu__item">
            <a className="menu__link js-nav-link" href="#" onClick={this.param}>Schedule</a>
          </li>
          <li className="menu__item">
            <a className="menu__link js-nav-link" href="#" onClick={this.param}>Team</a>
          </li>
          <li className="menu__item">
            <a className="menu__link js-nav-link" href="#" onClick={this.param}>Data</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;