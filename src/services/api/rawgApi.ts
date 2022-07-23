import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { REHYDRATE } from 'redux-persist';

import {
  IGame,
  IGameDetail,
  IGamesResponse,
  IPublishersDevelopersResponse,
  ITagsGenresResponse
} from '@ts/interfaces/api/rawgInterfaces';
import { TGenericObject } from '@ts/types/TGenericObject';

export const rawgApi = createApi({
  reducerPath: 'api-games',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/rawg/'
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Game', 'Tag', 'Genre'],
  endpoints: builder => ({
    indexGames: builder.query<IGamesResponse, TGenericObject>({
      query: searchParams => ({ url: `games`, params: searchParams })
    }),
    getGame: builder.query<IGameDetail, string | string[] | undefined>({
      query: id => ({ url: `game/`, params: { id: id } })
    }),
    getPublisherDetails: builder.query<IPublishersDevelopersResponse, string>({
      query: id => ({ url: `publisher/`, params: { id: id } })
    }),
    indexSimilarTags: builder.query<ITagsGenresResponse, void>({
      query: () => `tags`
    }),
    indexGenres: builder.query<ITagsGenresResponse, void>({
      query: () => `genres/`
    }),
    getDeveloperDetails: builder.query<IPublishersDevelopersResponse, string>({
      query: id => ({ url: `developer/${id}`, params: { id: id } })
    })
  })
});

export const {
  useGetGameQuery,
  useIndexGamesQuery,
  useGetPublisherDetailsQuery,
  useIndexSimilarTagsQuery,
  useIndexGenresQuery,
  useGetDeveloperDetailsQuery,
  util: { getRunningOperationPromises }
} = rawgApi;

export const {
  getGame,
  indexGames,
  getPublisherDetails,
  indexSimilarTags,
  indexGenres,
  getDeveloperDetails
} = rawgApi.endpoints;
