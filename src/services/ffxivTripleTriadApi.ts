import type { ICardsResponse } from '@ts/interfaces/tripleTriadInterfaces';

import axios, { AxiosResponse } from 'axios';

import { FFXIV_TRIPLE_TRIAD_API } from '@utils/constants';

const FFXIV_TRIPLE_TRIAD_CLIENT = axios.create({
  baseURL: FFXIV_TRIPLE_TRIAD_API.url,
  timeout: 3000
});

export const ffxivTripleTriadApiEndpoints = {
  indexCards: async () => {
    const { data }: AxiosResponse<ICardsResponse> =
      await FFXIV_TRIPLE_TRIAD_CLIENT.get('/cards');

    return data;
  }
};

export const { indexCards } = ffxivTripleTriadApiEndpoints;
