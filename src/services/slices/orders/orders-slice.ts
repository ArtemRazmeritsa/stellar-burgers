import { TFeedsResponse } from '@api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '@slices/slicesName';
import { TOrder } from '@utils-types';
import { RootState } from 'src/services/store';

interface TOrderState {
  userOrders: TOrder[] | [];
  isLoading: boolean;
}

const initialState: TOrderState = {
  userOrders: [],
  isLoading: false
};

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action): action is PayloadAction<TFeedsResponse> =>
        action.type.startsWith(`${ORDER_SLICE_NAME}/`) &&
        action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true;
      }
    );

    builder.addMatcher(
      (action): action is PayloadAction<TFeedsResponse> =>
        action.type.startsWith(`${ORDER_SLICE_NAME}/`) &&
        action.type.endsWith('/fulfilled'),
      (state, action) => {
        state.isLoading = false;
        if (action.payload?.orders) {
          state.userOrders = action.payload.orders;
        } else {
          state.userOrders = [];
        }
      }
    );

    builder.addMatcher(
      (action): action is PayloadAction =>
        action.type.startsWith(`${ORDER_SLICE_NAME}/`) &&
        action.type.endsWith('/rejected'),
      (state) => {
        state.isLoading = false;
      }
    );
  }
});

export const selectUserOrders = (state: RootState) =>
  state[ORDER_SLICE_NAME].userOrders;
