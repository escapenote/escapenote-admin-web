import {
  createAction,
  createSlice,
  Dispatch,
  PayloadAction,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import api from 'api';
import { AppState } from 'store';

export interface IState {
  location: { [key: string]: string[] };
}

const initialState: IState = {
  location: {},
};

export const hydrate = createAction<AppState>(HYDRATE);

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<any>) => {
      state.location = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.data,
      };
    });
  },
});

export const { setLocation } = dataSlice.actions;

export const fetchCommonData = () => async (dispatch: Dispatch) => {
  const { data } = await api.common.fetchCommon();
  dispatch(setLocation(data.location));
};

export default dataSlice;
