import { selectUserOrders } from '@slices/orders/orders-slice';

import { ProfileOrdersUI } from '@ui-pages';

import { FC } from 'react';
import { useSelector } from '@store';

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
