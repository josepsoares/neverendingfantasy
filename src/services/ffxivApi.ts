import axios, { AxiosResponse } from 'axios';
import type { TGenericObject } from '@ts/TGenericObject';

const FFXIV_API_URL = 'https://xivapi.com/';
const FFXIV_CLIENT = axios.create({
  baseURL: FFXIV_API_URL,
  timeout: 3000
});

export const ffxivApiEndpoints = {
  indexInstances: async query => {
    const { data }: AxiosResponse<TGenericObject> = await FFXIV_CLIENT.get(
      `/InstanceContent?search`,
      {
        params: {
          source: JSON.stringify(query),
          source_content_type: 'application/json'
        }
      }
    );

    return data;
  },
  getInstance: async (id: number) => {
    const { data }: AxiosResponse<any> = await FFXIV_CLIENT.get(
      `/InstanceContent/${id}`
    );

    return data;
  },
  indexClassJobs: async () => {
    const { data }: AxiosResponse<any> = await FFXIV_CLIENT.get(`/ClassJob`);

    return data;
  },
  getClassJob: async (id: number) => {
    const { data }: AxiosResponse<any> = await FFXIV_CLIENT.get(
      `/ClassJob/${id}`
    );

    return data;
  }
};

export const { indexInstances, getInstance, indexClassJobs, getClassJob } =
  ffxivApiEndpoints;
