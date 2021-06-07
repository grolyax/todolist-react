import * as types from './types';

import ActionStatus from '../../constants/action-status';

const initialState = {
  tasks: [],
  status: ActionStatus.IDLE,
};

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case types.ADD_LIST_TASK_SUCCESS: {
      return {
        ...state,
        status: ActionStatus.SUCCEEDED,
        tasks: [...state.tasks, action.payload],
      };
    }

    case types.REMOVE_LIST_TASK_SUCCESS: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        status: ActionStatus.SUCCEEDED,
      };
    }

    case types.UPDATE_LIST_TASK_SUCCESS: {
      const updatedTask = action.payload;

      return {
        ...state,
        status: ActionStatus.SUCCEEDED,
        tasks: state.tasks.map((task) => {
          if (task.id === updatedTask.id) {
            return updatedTask;
          }

          return task;
        })
      };
    }

    case types.GET_LIST_TASKS_REQUEST:
    case types.REMOVE_LIST_TASK_REQUEST:
    case types.ADD_LIST_TASK_REQUEST:
    case types.UPDATE_LIST_TASK_REQUEST:
    case types.DELETE_CHECKED_LIST_TASKS_REQUEST: {
      return {
        ...state,
        status: ActionStatus.LOADING,
      };
    }

    case types.DELETE_CHECKED_LIST_TASKS_SUCCESS: {
      return {
        ...state,
        status: ActionStatus.SUCCEEDED,
        tasks: state.tasks.filter((task) => !action.payload.includes(task.id)),
      };
    }

    case types.GET_LIST_TASKS_SUCCESS: {
      return {
        ...state,
        tasks: action.payload,
        status: ActionStatus.SUCCEEDED,
      };
    }

    case types.REORDER_LIST_TASKS_SUCCESS: {
      const { from, to } = action.payload;

      const delta = from < to ? -1 : 1;
      return {
        ...state,
        status: ActionStatus.SUCCEEDED,
        tasks: state.tasks.map((task) => {
          if (task.order === from) {
            return { ...task, order: to };
          }

          if (delta === -1) {
            if (task.order > from && task.order <= to) {
              return { ...task, order: task.order + delta };
            }
          } else if (task.order < from && task.order >= to) {
            return { ...task, order: task.order + delta };
          }

          return task;
        }),
      };
    }

    default: {
      return state;
    }
  }
}
