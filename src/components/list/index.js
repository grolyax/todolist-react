import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddEntityForm from '../common/add-entity-form';
import ListOfTasks from './list-of-tasks';
import EntityType from '../../constants/entity-type';

import { getListTasks, addListTask, updateListTask } from '../../store/tasks/actions';

class List extends Component {
  componentDidMount() {
    const { getListTasks } = this.props;

    getListTasks();
  }

  render() {
    const { tasks, addListTask, updateListTask } = this.props;

    return (
      <>
        <div className="add-form">
          <AddEntityForm type={EntityType.TASK} onSubmit={addListTask} />
        </div>

        <div className="todo-list">
          <ListOfTasks tasks={tasks} onEdit={updateListTask} />
        </div>

        <div className="delete-checked-wrapper">
          <button className="delete-checked-btn">Delete Checked</button>
        </div>
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
  const { match: { params }
  } = ownProps;

  return {
    getListTasks: () => dispatch(getListTasks(params.id)),
    addListTask: (newTask) => dispatch(addListTask({ newTask, listId: params.id })),
    updateListTask: (task) => dispatch(updateListTask(task)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
