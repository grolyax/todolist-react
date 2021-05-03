import { createAsyncThunk } from '@reduxjs/toolkit';
import * as types from './types';
import apiService from '../../services/api-service';

export const addList = createAsyncThunk(types.ADD_LIST, async (list) => {
  console.log(list);
  return await apiService.post('lists', list);
});

export const deleteList = createAsyncThunk(types.ADD_LIST, async (id) => await apiService.delete(`lists/${id}`));

export const getLists = createAsyncThunk(types.GET_LISTS, async () => await apiService.get('lists'));
