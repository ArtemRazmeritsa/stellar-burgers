import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { INGREDITNTS_SLICE_NAME } from '@slices/slicesName';

export const getIngredients = createAsyncThunk(
  `${INGREDITNTS_SLICE_NAME}/fetchIngredients`,
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);
