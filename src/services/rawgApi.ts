import type {
  IGameDetail,
  IGameMoviesResponse,
  IGameScreenshotsResponse,
  IGameStoresResponse,
  IGamesResponse,
  ITagsGenresResponse
} from '@ts/interfaces/rawgInterfaces';

import axios, { AxiosResponse } from 'axios';

import { RAWG_API } from '@utils/constants';
import { addParamsToGetRequest } from '@utils/helpers/addParamsToGetRequest';

const RAWG_CLIENT = axios.create({
  baseURL: RAWG_API.url,
  timeout: 3000
});

export const rawgApiEndpoints = {
  indexGames: async ({ pageParam = { page: 1 }, filters }) => {
    const { data }: AxiosResponse<IGamesResponse> = await RAWG_CLIENT.get(
      `/games?page=${pageParam.page}&${addParamsToGetRequest(filters)}`
    );

    return data;
  },
  getGame: async (id: number) => {
    const { data }: AxiosResponse<IGameDetail> = await RAWG_CLIENT.get(
      `/game/${id}`
    );

    return data;
  },
  getGameTrailers: async (id: number) => {
    const { data }: AxiosResponse<IGameMoviesResponse> = await RAWG_CLIENT.get(
      `/game/${id}/movies`
    );

    return data;
  },
  getGameScreenshots: async (id: number) => {
    const { data }: AxiosResponse<IGameScreenshotsResponse> =
      await RAWG_CLIENT.get(`/game/${id}/screenshots`);

    return data;
  },
  getGameStoreLinks: async (id: number) => {
    const { data }: AxiosResponse<IGameStoresResponse> = await RAWG_CLIENT.get(
      `/game/${id}/stores`
    );

    return data;
  },
  indexSimilarTags: async () => {
    const { data }: AxiosResponse<ITagsGenresResponse> = await RAWG_CLIENT.get(
      `/tags`
    );

    return data;
  },
  indexGenres: async () => {
    const { data }: AxiosResponse<ITagsGenresResponse> = await RAWG_CLIENT.get(
      `/genres`
    );

    return data;
  }
};

export const {
  indexGames,
  getGame,
  getGameTrailers,
  getGameScreenshots,
  getGameStoreLinks,
  indexSimilarTags,
  indexGenres
} = rawgApiEndpoints;
