import React from 'react';

const ListOfTasks = ({ tasks }) => (
  <ol>
    {tasks.map((task) => (
      <li key={task.id}>
        <input type="checkbox" />

        <span>{task.text}</span>

        <button className="edit-btn">
          <i className="fa fa-edit" aria-hidden="true" />
        </button>

        <button className="delete-btn">
          <i className="fa fa-trash" />
        </button>
      </li>
    ))}
  </ol>
);

export default ListOfTasks;
