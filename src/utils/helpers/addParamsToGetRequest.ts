import { TGenericObject } from '@ts/types/TGenericObject';
import { _add } from '@utils/helpers/add';

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
