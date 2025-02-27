import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { CONSTRUCTOR_SLICE_NAME } from '@slices/slicesName';
import { RootState } from '../store';
import { v4 as uuidv4 } from 'uuid';

interface TConstructorState {
  bun: TConstructorIngredient | null;
  constructorIngredients: TConstructorIngredient[];
}

const initialState: TConstructorState = {
  bun: null,
  constructorIngredients: []
};

export const constructorSlice = createSlice({
  name: CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    addToConstructor: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.constructorIngredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },

    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorIngredients = state.constructorIngredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveIngredient: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const ingredients = [...state.constructorIngredients];
      const [movedItem] = ingredients.splice(from, 1);
      ingredients.splice(to, 0, movedItem);

      state.constructorIngredients = ingredients;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.constructorIngredients = [];
    }
  }
});

export const {
  addToConstructor,
  removeIngredient,
  clearConstructor,
  moveIngredient
} = constructorSlice.actions;
export const selectConstructorBun = (state: RootState) =>
  state[CONSTRUCTOR_SLICE_NAME].bun;
export const selectConstructorIngredients = (state: RootState) =>
  state[CONSTRUCTOR_SLICE_NAME].constructorIngredients;
