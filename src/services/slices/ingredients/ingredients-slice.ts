import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../../store';
import { INGREDITNTS_SLICE_NAME } from '@slices/slicesName';
import { getIngredients } from './ingredients-thunks';

interface TIngredientState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TIngredientState = {
  ingredients: [],
  isLoading: true,
  error: null
};

export const ingredientsSlice = createSlice({
  name: INGREDITNTS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
  }
});

export const selectIngredients = (state: RootState) =>
  state[INGREDITNTS_SLICE_NAME].ingredients;
export const selectIsLoading = (state: RootState) =>
  state[INGREDITNTS_SLICE_NAME].isLoading;
export { getIngredients };
