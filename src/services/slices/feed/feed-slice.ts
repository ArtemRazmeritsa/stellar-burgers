import { TFeedsResponse } from '@api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from '@slices/slicesName';
import { TOrder } from '@utils-types';
import { RootState } from 'src/services/store';

export interface TFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
}

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action): action is PayloadAction<TFeedsResponse> =>
        action.type.startsWith('feed/') && action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true;
      }
    );

    builder.addMatcher(
      (action): action is PayloadAction<TFeedsResponse> =>
        action.type.startsWith('feed/') && action.type.endsWith('/fulfilled'),
      (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      }
    );

    builder.addMatcher(
      (action): action is PayloadAction =>
        action.type.startsWith('feed/') && action.type.endsWith('/rejected'),
      (state) => {
        state.isLoading = false;
      }
    );
  }
});

export const selectOrders = (state: RootState) => state[FEED_SLICE_NAME].orders;
export const selectIsLoading = (state: RootState) =>
  state[FEED_SLICE_NAME].isLoading;
