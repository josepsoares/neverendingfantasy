import axios, { AxiosResponse } from 'axios';
import { addParamsToGetRequest } from '@utils/helpers/addParamsToGetRequest';
import { _add } from '@utils/helpers/math';

import type {
  IAchievementsResponse,
  IArmoiresResponse,
  IEmoteResponse,
  IFashionResponse,
  IMinionsResponse,
  IMountsResponse,
  IOrchestrionResponse,
  IRelicResponse
} from '@ts/interfaces/ffxivCollectInterfaces';

const FFXIV_COLLECT_API_URL = 'https://ffxivcollect.com/api';
const FFXIV_COLLECT_CLIENT = axios.create({
  baseURL: FFXIV_COLLECT_API_URL,
  timeout: 3000
});

export const ffxivCollectApiEndpoints = {
  indexAccessories: async ({ filters }) => {
    const { data }: AxiosResponse<IFashionResponse> =
      await FFXIV_COLLECT_CLIENT.get(
        `/fashions?${addParamsToGetRequest(filters)}`
      );

    return data;
  },
  indexAchievements: async ({
    pageParam = { start: 1, end: 21 },
    filters = {}
  }) => {
    const { data }: AxiosResponse<IAchievementsResponse> =
      await FFXIV_COLLECT_CLIENT.get(
        `/achievements?id_in=${pageParam.start}...${
          pageParam.end
        }&${addParamsToGetRequest(filters)}`
      );

    return data;
  },
  indexArmoires: async ({
    pageParam = { start: 1, end: 21 },
    filters = {}
  }) => {
    const { data }: AxiosResponse<IArmoiresResponse> =
      await FFXIV_COLLECT_CLIENT.get(
        `/armoires?id_in=${pageParam.start}...${
          pageParam.end
        }&${addParamsToGetRequest(filters)}`
      );

    return data;
  },
  indexEmotes: async ({ pageParam = { start: 1, end: 21 }, filters = {} }) => {
    const { data }: AxiosResponse<IEmoteResponse> =
      await FFXIV_COLLECT_CLIENT.get(
        `/emotes?${addParamsToGetRequest(filters)}`
      );

    return data;
  },
  indexMinions: async ({ pageParam = { start: 1, end: 21 }, filters = {} }) => {
    const { data }: AxiosResponse<IMinionsResponse> =
      await FFXIV_COLLECT_CLIENT.get(
        `/minions?id_in=${pageParam.start}...${
          pageParam.end
        }&${addParamsToGetRequest(filters)}`
      );

    return data;
  },
  indexMounts: async ({ pageParam = { start: 1, end: 21 }, filters = {} }) => {
    const { data }: AxiosResponse<IMountsResponse> =
      await FFXIV_COLLECT_CLIENT.get(
        `/mounts?id_in=${pageParam.start}...${
          pageParam.end
        }&${addParamsToGetRequest(filters)}`
      );

    return data;
  },
  indexOrchestrions: async ({
    pageParam = { start: 1, end: 21 },
    filters = {}
  }) => {
    const { data }: AxiosResponse<IOrchestrionResponse> =
      await FFXIV_COLLECT_CLIENT.get(
        `/orchestrions?id_in=${pageParam.start}...${
          pageParam.end
        }&${addParamsToGetRequest(filters)}`
      );

    return data;
  },
  indexRelics: async ({ pageParam = { start: 1, end: 21 }, filters = {} }) => {
    const { data }: AxiosResponse<IRelicResponse> =
      await FFXIV_COLLECT_CLIENT.get(
        `/relics?id_in=${pageParam.start}...${
          pageParam.end
        }&${addParamsToGetRequest(filters)}`
      );

    return data;
  }
};

export const {
  indexAccessories,
  indexAchievements,
  indexMounts,
  indexMinions,
  indexArmoires,
  indexOrchestrions,
  indexRelics,
  indexEmotes
} = ffxivCollectApiEndpoints;
