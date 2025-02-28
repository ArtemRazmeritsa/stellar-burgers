import { getFeedsApi, TFeedsResponse } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from '@slices/slicesName';

export const getFeeds = createAsyncThunk<TFeedsResponse, void>(
  `${FEED_SLICE_NAME}/getFeeds`,
  async () => await getFeedsApi()
);
