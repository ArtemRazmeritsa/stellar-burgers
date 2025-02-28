import { configureStore, combineReducers, createSlice } from '@reduxjs/toolkit';
import { ingredientsSlice } from '@slices/ingredients/ingredients-slice';
import { constructorSlice } from '@slices/constructor-slice';
import { userSlice } from '@slices/user/user-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { feedSlice } from '@slices/feed/feed-slice';
import { orderSlice } from '@slices/orders/orders-slice';
import { newOrderSlice } from '@slices/orders/newOrder-slice';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [newOrderSlice.name]: newOrderSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
