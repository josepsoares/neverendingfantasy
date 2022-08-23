import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { REHYDRATE } from 'redux-persist';

import type { TGenericObject } from '@ts/types/TGenericObject';

export const ffxivApi = createApi({
  reducerPath: 'api-ffxiv',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://xivapi.com/'
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: builder => ({
    indexInstances: builder.query<any, TGenericObject>({
      query: elsQuery => ({
        url: `InstanceContent?search`,
        params: {
          source: JSON.stringify(elsQuery),
          source_content_type: 'application/json'
        }
      })
    }),
    getInstance: builder.query<any, string>({
      query: id => ({
        url: `InstanceContent/${id}`
      })
    }),
    indexClassJobs: builder.query<{ Results: any[] }, void>({
      query: () => `ClassJob`
    }),
    getClassJob: builder.query<any, string>({
      query: id => `ClassJob/${id}`
    })
  })
});

export const {
  useIndexInstancesQuery,
  useGetInstanceQuery,
  useIndexClassJobsQuery,
  useGetClassJobQuery,
  util: { getRunningOperationPromises }
} = ffxivApi;

export const { indexInstances, getInstance, indexClassJobs, getClassJob } =
  ffxivApi.endpoints;
