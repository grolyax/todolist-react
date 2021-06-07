import { createAsyncThunk } from '@reduxjs/toolkit';
import * as types from './types';
import apiService from '../../services/api-service';

export const getLists = createAsyncThunk(types.GET_LISTS, () => apiService.get('lists'));

export const addList = createAsyncThunk(types.ADD_LIST, (list) => apiService.post('lists', list));

export const updateList = createAsyncThunk(
  types.UPDATE_LIST,
  (list) => apiService.put(`lists/${list.id}`, list)
);

export const deleteList = createAsyncThunk(types.REMOVE_LIST, async (id) => {
  await apiService.delete(`lists/${id}`);

  return id;
});
