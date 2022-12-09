import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { IAuth } from 'types';
import { AppState } from 'store';

type SliceState = {
  user: IAuth | null;
};

const initialState: SliceState = {
  user: null,
};

export const hydrate = createAction<AppState>(HYDRATE);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAuth | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    });
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice;
