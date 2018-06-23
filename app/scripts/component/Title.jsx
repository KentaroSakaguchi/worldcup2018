import React, { Component } from 'react';

class Title extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Schedule'
    };
  }
  
  render() {
    return(
      <h2 className="nav">{this.state.title}</h2>
    );
  }
}

export default Title;