import React, { Component } from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import EditEntityInput from '../common/edit-entity-input';

export default class ListOfTasks extends Component {
  constructor() {
    super();

    this.state = {
      editTaskId: null
    };

    this.editEntityInput = React.createRef();
  }

  setEditTaskId = (editTaskId) => {
    this.setState({
      editTaskId,
    });
  };

  handleEdit = (value) => {
    const { tasks, onEdit } = this.props;
    const { editTaskId } = this.state;

    const task = tasks.find((t) => t.id === editTaskId);

    onEdit({ ...task, name: value });

    this.setEditTaskId(null);
  }

  handleEditButtonClick = (taskId) => {
    const { editTaskId } = this.state;

    if (editTaskId) {
      this.editEntityInput.current.handleEdit();

      return;
    }

    this.setEditTaskId(taskId);
  };

  handleTaskCheck = (taskId) => {
    const { onEdit, tasks } = this.props;

    const task = tasks.find((t) => t.id === taskId);

    onEdit({ ...task, checked: !task.checked });
  }

  handleTaskOrderChange = (result) => {
    const { onReorder } = this.props;
    if (!result.destination) {
      return;
    }

    onReorder({ from: result.source.index + 1, to: result.destination.index + 1 });
  }

  render() {
    const { tasks, onDelete } = this.props;
    const { editTaskId } = this.state;

    return (
      <DragDropContext onDragEnd={this.handleTaskOrderChange}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <ol
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <input
                        type="checkbox"
                        defaultChecked={task.checked}
                        onChange={() => this.handleTaskCheck(task.id)}
                      />

                      {editTaskId === task.id ? (
                        <EditEntityInput
                          value={task.name}
                          onEdit={this.handleEdit}
                          ref={this.editEntityInput}
                        />
                      ) : (<span>{task.name}</span>)}

                      <button
                        className="edit-btn"
                        onClick={() => this.handleEditButtonClick(task.id)}
                      >
                        <i className="fa fa-edit" aria-hidden="true" />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => onDelete(task.id)}
                      >
                        <i className="fa fa-trash" />
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
            </ol>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
