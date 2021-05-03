import React from 'react';

const ListOfTask = ({ task }) => {
    <ol>
        {task.map((task) => (
            <li key={task.id}>
                <input type="checkbox" />

                <span>{task.text}</span>

                <button className="edit-btn">
                    <i className="fa fa-edit" aria-hidden="true"></i>
                </button>

                <button className="delete-btn">
                    <i className="fa fa-trash"></i>
                </button>
            </li>
        ))}
    </ol>
);

export default ListOfTask;