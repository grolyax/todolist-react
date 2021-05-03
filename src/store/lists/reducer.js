import * as types from './types';
import ActionStatus from '../../constants/action-status';

const initialState = {
  lists: [],
  status: ActionStatus.IDLE,
};

export default function lists(state = initialState, action) {
  switch (action.type) {
    case types.ADD_LIST_SUCCESS: {
      return {
        ...state,
        lists: [...state.lists, action.payload],
        status: ActionStatus.SUCCEEDED,
      };
    }
    case types.REMOVE_LIST_SUCCESS: {
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
        status: ActionStatus.SUCCEEDED,
      };
    }

    case types.ADD_LIST_REQUEST:
    case types.REMOVE_LIST_REQUEST:
    case types.GET_LISTS_REQUEST: {
      return {
        ...state,
        status: ActionStatus.LOADING,
      };
    }

    case types.GET_LISTS_SUCCESS: {
      return {
        ...state,
        lists: action.payload,
        status: ActionStatus.SUCCEEDED,
      };
    }

    default: {
      return state;
    }
  }
}
