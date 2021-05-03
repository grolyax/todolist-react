import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListOfLists = ({ lists, onDelete }) => (
  <ol>
    {lists.map((list) => (
      <li key={list.id}>
        <Link to={`/list/${list.id}`}>{list.name}</Link>

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
