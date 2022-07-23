import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { REHYDRATE } from 'redux-persist';

import {
  IAchievement,
  IAchievementsResponse,
  IArmoire,
  IArmoiresResponse,
  IBarding,
  IBardingsResponse,
  IFashion,
  IFashionResponse,
  IHairstyle,
  IHairstylesResponse,
  IMinionsResponse,
  IMount,
  IMountsResponse
} from '@ts/interfaces/api/ffxiv/ffxivCollectInterfaces';
import { _add } from '@utils/helpers/add';
import { addParamsToGetRequest } from '@utils/helpers/addParamsToGetRequest';
import { TGenericObject } from '@ts/types/TGenericObject';

export const ffxivCollectApi = createApi({
  reducerPath: 'api-ffxiv-collect',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ffxivcollect.com/api/'
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: builder => ({
    indexAchievements: builder.query<IAchievementsResponse, TGenericObject>({
      query: searchParams =>
        `achievements?${addParamsToGetRequest(searchParams)}`
    }),
    getAchievement: builder.query<IAchievement, string>({
      query: id => `achievements/${id}`
    }),
    indexMounts: builder.query<IMountsResponse, TGenericObject>({
      query: searchParams => `mounts?${addParamsToGetRequest(searchParams)}`
    }),
    getMount: builder.query<IMount, string>({
      query: id => `mounts/${id}`
    }),
    indexMinions: builder.query<IMinionsResponse, TGenericObject>({
      query: searchParams => `minions?${addParamsToGetRequest(searchParams)}`
    }),
    getMinion: builder.query<IMinionsResponse, string>({
      query: id => `minions/${id}`
    }),
    indexBardings: builder.query<IBardingsResponse, TGenericObject>({
      query: searchParams => `bardings?${addParamsToGetRequest(searchParams)}`
    }),
    getBarding: builder.query<IBarding, string>({
      query: id => `bardings/${id}`
    }),
    indexHairstyles: builder.query<IHairstylesResponse, TGenericObject>({
      query: searchParams => `hairstyles?${addParamsToGetRequest(searchParams)}`
    }),
    getHairstyle: builder.query<IHairstyle, string>({
      query: id => `hairstyles/${id}`
    }),
    indexArmoires: builder.query<IArmoiresResponse, TGenericObject>({
      query: searchParams => `armoires?${addParamsToGetRequest(searchParams)}`
    }),
    getArmoire: builder.query<IArmoire, string>({
      query: id => `armoires/${id}`
    }),
    indexFashions: builder.query<IFashionResponse, TGenericObject>({
      query: searchParams => `fashions?${addParamsToGetRequest(searchParams)}`
    }),
    getFashion: builder.query<IFashion, string>({
      query: id => `fashions/${id}`
    })
  })
});

export const {
  useIndexAchievementsQuery,
  useGetAchievementQuery,
  useIndexMountsQuery,
  useGetMountQuery,
  useIndexMinionsQuery,
  useGetMinionQuery,
  useIndexBardingsQuery,
  useGetBardingQuery,
  useIndexHairstylesQuery,
  useGetHairstyleQuery,
  useIndexArmoiresQuery,
  useGetArmoireQuery,
  useIndexFashionsQuery,
  useGetFashionQuery,
  util: { getRunningOperationPromises }
} = ffxivCollectApi;

export const {
  indexAchievements,
  getAchievement,
  indexMounts,
  getMount,
  indexMinions,
  getMinion,
  indexBardings,
  getBarding,
  indexHairstyles,
  getHairstyle,
  indexArmoires,
  getArmoire,
  indexFashions,
  getFashion
} = ffxivCollectApi.endpoints;
