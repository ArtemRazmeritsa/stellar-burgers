import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { removeIngredient, moveIngredient } from '@slices/constructor-slice';
import { useDispatch } from 'react-redux';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = (fromIndex: number) => {
      dispatch(moveIngredient({ from: fromIndex, to: fromIndex + 1 }));
    };

    const handleMoveUp = (fromIndex: number) => {
      dispatch(moveIngredient({ from: fromIndex, to: fromIndex - 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={() => handleMoveUp(index)}
        handleMoveDown={() => handleMoveDown(index)}
        handleClose={handleClose}
      />
    );
  }
);
