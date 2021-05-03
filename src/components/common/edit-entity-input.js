import React, { Component } from 'react';

const ENTER_KEY_CODE = 13;

export default class EditEntityInput extends Component {
  constructor(props) {
    super();

    this.state = {
      value: props.value,
    };
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleKeyDown = (e) => {
    const { value } = this.state;
    const { onEdit } = this.props;

    if (e.keyCode !== ENTER_KEY_CODE) {
      return;
    }

    onEdit(value);
  }

  render() {
    const { value } = this.state;
    return <input type="text" value={value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />;
  }
}
