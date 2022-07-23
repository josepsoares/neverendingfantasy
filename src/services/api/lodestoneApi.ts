import {
  createApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { REHYDRATE } from 'redux-persist';

import { ILodestoneNew } from '@ts/interfaces/api/ffxiv/ILodestoneInterfaces';

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, WebApi, extraOptions) => {
  const baseUrl = (WebApi.getState() as any).configuration.baseUrl;
  const rawBaseQuery = fetchBaseQuery({ baseUrl });
  return rawBaseQuery(args, WebApi, extraOptions);
};

export const lodestoneApi = createApi({
  reducerPath: 'api-ffxiv-lodestone',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://na.lodestonenews.com/news/'
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Lodestone'],
  endpoints: builder => ({
    // topics
    // notices
    // maintenance
    // updates
    // status
    // developers
    // feed
    // all
    getNews: builder.query<ILodestoneNew[], string>({
      query: query => `${query}`
    })
  })
});

export const {
  useGetNewsQuery,
  util: { getRunningOperationPromises }
} = lodestoneApi;

export const { getNews } = lodestoneApi.endpoints;
