import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../common/loader';
import AddEntityForm from '../common/add-entity-form';
import ListOfTasks from './list-of-tasks';

import EntityType from '../../constants/entity-type';
import ActionStatus from '../../constants/action-status';

import {
  getListTasks,
  addListTask,
  updateListTask,
  deleteListTask,
  deleteCheckedListTasks
} from '../../store/tasks/actions';

class List extends Component {
  componentDidMount() {
    const { getListTasks } = this.props;

    getListTasks();
  }

  handleAddListTask = (newTask) => {
    const { addListTask } = this.props;

    addListTask({ ...newTask, checked: false });
  }

  render() {
    const { tasks, updateListTask, status, deleteListTask, deleteCheckedListTasks, } = this.props;

    return (
      <>
        <div className="add-form">
          <AddEntityForm
            type={EntityType.TASK}
            onSubmit={this.handleAddListTask}
          />
        </div>

        <div className="todo-list">
          <ListOfTasks
            tasks={tasks}
            onEdit={updateListTask}
            onDelete={deleteListTask}
          />
        </div>

        <div className="delete-checked-wrapper">
          <button
            className="delete-checked-btn"
            onClick={deleteCheckedListTasks}
          >
            Delete Checked
          </button>
        </div>

        {status === ActionStatus.LOADING && <Loader />}

      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks.tasks,
    status: state.tasks.status,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const {
    match: { params },
  } = ownProps;

  return {
    getListTasks: () => dispatch(getListTasks(params.id)),
    addListTask: (newTask) => dispatch(addListTask({ newTask, listId: params.id })),
    updateListTask: (task) => dispatch(updateListTask(task)),
    deleteListTask: (taskId) => dispatch(deleteListTask({ taskId, listId: params.id })),
    deleteCheckedListTasks: () => dispatch(deleteCheckedListTasks(params.id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
