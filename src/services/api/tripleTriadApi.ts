import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { REHYDRATE } from 'redux-persist';

import {
  ICard,
  ICardsResponse,
  INpc,
  INpcsResponse,
  IPack,
  IPacksResponse
} from '@ts/interfaces/api/ffxiv/tripleTriadInterfaces';
import { TGenericObject } from '@ts/types/TGenericObject';
import { addParamsToGetRequest } from '@utils/helpers/addParamsToGetRequest';

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
    getCard: builder.query<ICard, string>({
      query: id => `cards/${id}`
    }),
    indexNpcs: builder.query<INpcsResponse, TGenericObject>({
      query: searchParams => `npcs?${addParamsToGetRequest(searchParams)}`
    }),
    getNpc: builder.query<INpc, string>({
      query: id => `npcs/${id}`
    }),
    indexPacks: builder.query<IPacksResponse, TGenericObject>({
      query: searchParams => `packs?${addParamsToGetRequest(searchParams)}`
    }),
    getPack: builder.query<IPack, string>({
      query: id => `packs/${id}`
    })
  })
});

export const {
  useIndexCardsQuery,
  useGetCardQuery,
  useIndexNpcsQuery,
  useGetNpcQuery,
  useIndexPacksQuery,
  useGetPackQuery,
  util: { getRunningOperationPromises }
} = tripleTriadApi;

export const { indexCards, getCard, indexNpcs, getNpc, indexPacks, getPack } =
  tripleTriadApi.endpoints;
