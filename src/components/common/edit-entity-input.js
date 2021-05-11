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

  handleEdit = () => {
    const { value } = this.state;
    const { onEdit } = this.props;

    onEdit(value);
  };

  handleKeyDown = (e) => {
    if (e.keyCode !== ENTER_KEY_CODE) {
      return;
    }

    this.handleEdit();
  };

  render() {
    const { value } = this.state;

    return (
      <input
        type="text"
        value={value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}
