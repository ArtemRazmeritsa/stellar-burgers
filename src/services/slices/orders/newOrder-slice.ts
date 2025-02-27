import { TNewOrderResponse, TOrderResponse } from '@api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CREATE_SLICE_NAME } from '@slices/slicesName';
import { TOrder } from '@utils-types';
import { RootState } from 'src/services/store';

interface TCreateState {
  order: TOrder | null;
  orderRequest: boolean;
  orderByNumber: TOrder[] | null;
}

const initialState: TCreateState = {
  order: null,
  orderRequest: false,
  orderByNumber: null
};

export const newOrderSlice = createSlice({
  name: CREATE_SLICE_NAME,
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action): action is PayloadAction<TNewOrderResponse> =>
        action.type.startsWith(`${CREATE_SLICE_NAME}`) &&
        action.type.endsWith('/pending'),
      (state) => {
        state.orderRequest = true;
      }
    );

    builder.addMatcher(
      (action): action is PayloadAction<TNewOrderResponse> =>
        action.type.startsWith(`${CREATE_SLICE_NAME}`) &&
        action.type.endsWith('/fulfilled'),
      (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
      }
    );
    builder.addMatcher(
      (action) =>
        action.type.startsWith(`${CREATE_SLICE_NAME}/getOrderByNumber`) &&
        action.type.endsWith('/fulfilled'),
      (state, action: PayloadAction<TOrderResponse>) => {
        state.orderRequest = false;
        state.orderByNumber = action.payload.orders;
      }
    );

    builder.addMatcher(
      (action): action is PayloadAction =>
        action.type.startsWith(`${CREATE_SLICE_NAME}`) &&
        action.type.endsWith('/rejected'),
      (state) => {
        state.orderRequest = false;
      }
    );
  }
});

export const { clearOrder } = newOrderSlice.actions;
export const selectUserOrder = (state: RootState) =>
  state[CREATE_SLICE_NAME].order;
export const selectOrderRequest = (state: RootState) =>
  state[CREATE_SLICE_NAME].orderRequest;
export const selectOrderByNumber = (state: RootState) =>
  state[CREATE_SLICE_NAME].orderByNumber;
