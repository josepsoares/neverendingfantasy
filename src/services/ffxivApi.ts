import axios, { AxiosResponse } from 'axios';

import { XIV_API } from '@utils/constants';

const FFXIV_CLIENT = axios.create({
  baseURL: XIV_API.url,
  timeout: 3000
});

export const ffxivApiEndpoints = {
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

export const { indexClassJobs, getClassJob } = ffxivApiEndpoints;
