import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TFeedsResponse,
  TNewOrderResponse,
  TOrderResponse
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CREATE_SLICE_NAME, ORDER_SLICE_NAME } from '@slices/slicesName';

export const getUserOrders = createAsyncThunk<TFeedsResponse, void>(
  `${ORDER_SLICE_NAME}/getUserOrders`,
  async () => {
    const result = await getOrdersApi();
    return result;
  }
);

export const createOrder = createAsyncThunk<
  TNewOrderResponse,
  { data: string[] }
>(
  `${CREATE_SLICE_NAME}/createOrder`,
  async ({ data }) => await orderBurgerApi(data)
);

export const getOrderByNumber = createAsyncThunk<TOrderResponse, number>(
  `${CREATE_SLICE_NAME}/getOrderByNumber`,
  async (data: number) => getOrderByNumberApi(data)
);
