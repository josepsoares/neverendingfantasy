import { _add } from '@utils/helpers/math';
import { TGenericObject } from '@ts/TGenericObject';

export const addParamsToGetRequest = (queries: TGenericObject) => {
  return Object.keys(queries)
    .reduce((result: string[], key: string) => {
      return [
        ...result,
        `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`
      ];
    }, [])
    .join('&');
};
