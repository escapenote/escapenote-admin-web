import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { AppState } from 'store';

type ThemeType = 'dark' | 'light';
type SliceState = {
  theme: ThemeType;
  isMobile: boolean;
  isFolded: boolean;
};

const initialState: SliceState = {
  theme: 'dark',
  isMobile: false,
  isFolded: false,
};

export const hydrate = createAction<AppState>(HYDRATE);

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setIsFolded: (state, action: PayloadAction<boolean>) => {
      state.isFolded = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.common,
      };
    });
  },
});

export const { setIsMobile, setIsFolded, setTheme } = commonSlice.actions;

export default commonSlice;
