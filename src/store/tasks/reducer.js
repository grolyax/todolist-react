import * as types from './types';

import ActionStatus from '../../constants/action-status';

const initialState = {
  tasks: [],
  status: ActionStatus.IDLE,
};

export default function task(state = initialState, action) {
  switch (action.type) {
    case types.GET_LIST_TASKS_REQUEST:
    case types.ADD_LIST_TASKS_REQUEST: {
      return { ...state, status: ActionStatus.LOADING };
    }

    case types.ADD_LIST_TASKS_SUCCESS: {
      return {
        ...state,
        status: ActionStatus.SUCCEEDED,
        tasks: [...state.tasks, action.payload],
      };
    }

    case types.GET_LIST_TASKS_SUCCESS: {
      return {
        ...state,
        tasks: action.payload,
        status: ActionStatus.SUCCEEDED,
      };
    }

    default: {
      return state;
    }
  }
}
