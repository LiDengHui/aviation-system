import { IResponse } from './request';

export const isValid = (res: IResponse) => {
  return res.code === 200;
};
