import { selectIsLoading, selectOrders } from '@slices/feed/feed-slice';
import { getFeeds } from '@slices/feed/feed-thunks';
import { getUserOrders } from '@slices/orders/orders-thunks';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';

export const Feed: FC = () => {
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getFeeds());
    dispatch(getUserOrders());
  }, []);

  if (!orders?.length || isLoading) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
