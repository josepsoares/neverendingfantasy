import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { REHYDRATE } from 'redux-persist';

import { addParamsToGetRequest } from '@utils/helpers/addParamsToGetRequest';

import type {
  ICardsResponse,
  INpcsResponse
} from '@ts/interfaces/api/ffxiv/tripleTriadInterfaces';
import type { TGenericObject } from '@ts/types/TGenericObject';

export const tripleTriadApi = createApi({
  reducerPath: 'api-ffxiv-triple-triad',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://triad.raelys.com/api/'
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Card', 'Deck', 'Npc', 'Pack'],
  endpoints: builder => ({
    indexCards: builder.query<ICardsResponse, TGenericObject>({
      query: searchParams => `cards?${addParamsToGetRequest(searchParams)}`
    }),
    indexNpcs: builder.query<INpcsResponse, TGenericObject>({
      query: searchParams => `npcs?${addParamsToGetRequest(searchParams)}`
    })
  })
});

export const {
  useIndexCardsQuery,
  useIndexNpcsQuery,
  util: { getRunningOperationPromises }
} = tripleTriadApi;

export const { indexCards, indexNpcs } = tripleTriadApi.endpoints;
