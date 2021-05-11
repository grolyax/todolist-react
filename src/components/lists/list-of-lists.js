import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditEntityInput from '../common/edit-entity-input';

export default class ListOfLists extends Component {
  constructor() {
    super();

    this.state = {
      editListId: null
    };

    this.editEntityInput = React.createRef();
  }

  setEditListId = (editListId) => {
    this.setState({
      editListId,
    });
  };

  handleEdit = (value) => {
    const { lists, onEdit } = this.props;
    const { editListId } = this.state;

    const list = lists.find((l) => l.id === editListId);

    onEdit({ ...list, name: value });

    this.setEditListId(null);
  }

  handleEditButtonClick = (listId) => {
    const { editListId } = this.state;

    if (editListId) {
      this.editEntityInput.current.handleEdit();

      return;
    }

    this.setEditListId(listId);
  };

  render() {
    const { lists, onDelete } = this.props;
    const { editListId } = this.state;

    return (
      <ol>
        {lists.map((list) => (
          <li key={list.id}>
            {editListId === list.id ? (
              <EditEntityInput
                value={list.name}
                onEdit={this.handleEdit}
                ref={this.editEntityInput}
              />
            ) : (<Link to={`/list/${list.id}`}>{list.name}</Link>)}

            <button
              className="edit-btn"
              onClick={() => this.handleEditButtonClick(list.id)}
            >
              <i className="fa fa-edit" aria-hidden="true" />
            </button>

            <button className="delete-btn" onClick={() => onDelete(list.id)}>
              <i className="fa fa-trash" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ol>
    );
  }
}
