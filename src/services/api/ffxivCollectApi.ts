import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { REHYDRATE } from 'redux-persist';

import { _add } from '@utils/helpers/add';
import { addParamsToGetRequest } from '@utils/helpers/addParamsToGetRequest';

import type {
  IAchievement,
  IAchievementsResponse,
  IArmoiresResponse,
  IEmoteResponse,
  IFashionResponse,
  IHairstylesResponse,
  IMinionsResponse,
  IMountsResponse,
  IOrchestrionResponse,
  IRelicWeaponResponse
} from '@ts/interfaces/api/ffxiv/ffxivCollectInterfaces';
import type { TGenericObject } from '@ts/types/TGenericObject';

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
    indexMinions: builder.query<IMinionsResponse, TGenericObject>({
      query: searchParams => `minions?${addParamsToGetRequest(searchParams)}`
    }),
    indexHairstyles: builder.query<IHairstylesResponse, TGenericObject>({
      query: searchParams => `hairstyles?${addParamsToGetRequest(searchParams)}`
    }),
    indexArmoires: builder.query<IArmoiresResponse, TGenericObject>({
      query: searchParams => `armoires?${addParamsToGetRequest(searchParams)}`
    }),
    indexFashions: builder.query<IFashionResponse, TGenericObject>({
      query: searchParams => `fashions?${addParamsToGetRequest(searchParams)}`
    }),
    indexOrchestrion: builder.query<IOrchestrionResponse, TGenericObject>({
      query: searchParams =>
        `orchestrions?${addParamsToGetRequest(searchParams)}`
    }),
    indexRelicWeapons: builder.query<IRelicWeaponResponse, TGenericObject>({
      query: searchParams =>
        `fashions?type_category_eq=weapons&${addParamsToGetRequest(
          searchParams
        )}`
    }),
    indexEmotes: builder.query<IEmoteResponse, TGenericObject>({
      query: searchParams => `emotes?${addParamsToGetRequest(searchParams)}`
    })
  })
});

export const {
  useIndexAchievementsQuery,
  useGetAchievementQuery,
  useIndexMountsQuery,
  useIndexMinionsQuery,
  useIndexHairstylesQuery,
  useIndexArmoiresQuery,
  useIndexFashionsQuery,
  useIndexOrchestrionQuery,
  useIndexRelicWeaponsQuery,
  useIndexEmotesQuery,
  util: { getRunningOperationPromises }
} = ffxivCollectApi;

export const {
  indexAchievements,
  getAchievement,
  indexMounts,
  indexMinions,
  indexHairstyles,
  indexArmoires,
  indexFashions,
  indexOrchestrion,
  indexRelicWeapons,
  indexEmotes
} = ffxivCollectApi.endpoints;
