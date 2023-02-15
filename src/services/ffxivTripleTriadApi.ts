import axios, { AxiosResponse } from 'axios';
import { addParamsToGetRequest } from '@utils/helpers/addParamsToGetRequest';

import type { ICardsResponse } from '@ts/interfaces/tripleTriadInterfaces';

const FFXIV_TRIPLE_TRIAD_API_URL = 'https://triad.raelys.com/api';
const FFXIV_TRIPLE_TRIAD_CLIENT = axios.create({
  baseURL: FFXIV_TRIPLE_TRIAD_API_URL,
  timeout: 3000
});

export const ffxivTripleTriadApiEndpoints = {
  indexCards: async ({ pageParam = { start: 1, end: 21 }, filters }) => {
    const { data }: AxiosResponse<ICardsResponse> =
      await FFXIV_TRIPLE_TRIAD_CLIENT.get(
        `/cards?id_in=${pageParam.start}...${
          pageParam.end
        }&${addParamsToGetRequest(filters)}`
      );

    return data;
  }
};

export const { indexCards } = ffxivTripleTriadApiEndpoints;
