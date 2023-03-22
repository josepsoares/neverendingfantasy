import type {
  IArmoiresResponse,
  IEmoteResponse,
  IFashionResponse,
  IHairstyleResponse,
  IMinionsResponse,
  IMountsResponse,
  IOrchestrionResponse,
  IRelicResponse
} from '@ts/interfaces/ffxivCollectInterfaces';

import axios, { AxiosResponse } from 'axios';

import { FFXIV_COLLECT_API } from '@utils/constants';
import { _add } from '@utils/helpers/math';

const FFXIV_COLLECT_CLIENT = axios.create({
  baseURL: FFXIV_COLLECT_API.url,
  timeout: 3000
});

export const ffxivCollectApiEndpoints = {
  indexAccessories: async () => {
    const { data }: AxiosResponse<IFashionResponse> =
      await FFXIV_COLLECT_CLIENT.get(`/fashions`);

    return data;
  },
  indexHairstyles: async () => {
    const { data }: AxiosResponse<IHairstyleResponse> =
      await FFXIV_COLLECT_CLIENT.get(`/hairstyles`);

    return data;
  },
  indexArmoires: async () => {
    const { data }: AxiosResponse<IArmoiresResponse> =
      await FFXIV_COLLECT_CLIENT.get(`/armoires`);

    return data;
  },
  indexEmotes: async () => {
    const { data }: AxiosResponse<IEmoteResponse> =
      await FFXIV_COLLECT_CLIENT.get(`/emotes`);

    return data;
  },
  indexMinions: async () => {
    const { data }: AxiosResponse<IMinionsResponse> =
      await FFXIV_COLLECT_CLIENT.get(`/minions`);

    return data;
  },
  indexMounts: async () => {
    const { data }: AxiosResponse<IMountsResponse> =
      await FFXIV_COLLECT_CLIENT.get(`/mounts`);

    return data;
  },
  indexOrchestrions: async () => {
    const { data }: AxiosResponse<IOrchestrionResponse> =
      await FFXIV_COLLECT_CLIENT.get(`/orchestrions`);

    return data;
  }
};

export const {
  indexAccessories,
  indexArmoires,
  indexEmotes,
  indexHairstyles,
  indexMounts,
  indexMinions,
  indexOrchestrions
} = ffxivCollectApiEndpoints;
