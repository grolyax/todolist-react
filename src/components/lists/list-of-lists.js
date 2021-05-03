import React from 'react';
import PropTypes from 'prop-types';

const ListOfLists = ({ lists, onDelete }) => (
  <ol>
    {lists.map((list) => (
      <li key={list.id}>
        <a href="#">{list.name}</a>

        <button className="edit-btn">
          <i className="fa fa-edit" aria-hidden="true" />
        </button>

        <button className="delete-btn" onClick={() => onDelete(list.id)}>
          <i className="fa fa-trash" aria-hidden="true" />
        </button>
      </li>
    ))}
  </ol>
);

ListOfLists.propTypes = {
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ListOfLists;
