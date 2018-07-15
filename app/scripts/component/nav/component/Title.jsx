import React, { Component } from 'react';

class Title extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <h2 className="nav">{this.props.titleProp}</h2>
    );
  }
}

export default Title;