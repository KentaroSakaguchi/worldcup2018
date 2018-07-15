import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const setValue = event.target.value; // render後にpopsが更新される(setStateが走る)為、変数に代入する
    this.setState({ input: setValue });
    this.props.inputProp(setValue);
  }

  render() {
    return (
      <label className="input">
        <input
          className="input__input"
          type="text"
          placeholder="出場国を入力"
          value={this.state.input}
          onChange={this.handleChange}
        />
      </label>
    )
  }
}

SearchBlock.propTypes = {
  inputProp: PropTypes.func
}

export default SearchBlock;
