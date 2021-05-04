import { createAsyncThunk } from '@reduxjs/toolkit';
import * as types from './types';
import apiService from '../../services/api-service';

export const getListTasks = createAsyncThunk(types.GET_LIST_TASKS, (listId) => apiService.get(`lists/${listId}/tasks`));

export const addListTask = createAsyncThunk(types.ADD_LIST_TASKS, ({ newTask, listId }) => apiService.post(`list/${listId}/tasks`, newTask));

export const updateListTask = createAsyncThunk(types.UPDATE_LIST_TASK, (task) => apiService.put(`lists/${task.listId}/tasks/${task.id}`, task));
