import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import {
  clearConstructor,
  selectConstructorBun,
  selectConstructorIngredients
} from '@slices/constructor-slice';
import { createOrder } from '@slices/orders/orders-thunks';
import { AppDispatch } from 'src/services/store';
import {
  clearOrder,
  selectOrderRequest,
  selectUserOrder
} from '@slices/orders/newOrder-slice';
import { useNavigate } from 'react-router-dom';
import { selectUserData } from '@slices/user/user-slice';

export const BurgerConstructor: FC = () => {
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const order = useSelector(selectUserOrder);
  const orderRequest = useSelector(selectOrderRequest);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserData);

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const orderModalData = order;

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    const orderIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (ingredient: TConstructorIngredient) => ingredient._id
      ),
      constructorItems.bun._id
    ];
    dispatch(createOrder({ data: orderIngredients }));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
