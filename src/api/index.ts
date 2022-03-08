import { SeatModel } from '../constant';
import { IBookFlight } from '../model/bookFlight';
import { IFlight } from '../model/flight';
import { IPassenger } from '../model/passenger';
import { get, IResponse, post } from './utils/request';

export const changeStatus = async (): Promise<IResponse> => {
  const res = await get('/api/change/status');
  return res;
};

export interface IFlightListParams {
  origin: string;
  arrive: string;
  time: string;
}

// 创建航班请求
export const getFlightList = async (
  data: IFlightListParams
): Promise<IResponse<IFlight[]>> => {
  const res = await get('/api/flights', data);
  return res;
};

export interface IBookFlightParams {
  flightId: string;
  passengers: IPassenger[];
}

// 创建购票协议
export const bookFlight = async (
  data: IBookFlightParams
): Promise<IResponse<IBookFlight>> => {
  const res = await post('/api/book-flight-contracts/', data);
  return res;
};

export const getPassengerList = async (): Promise<IResponse<IPassenger[]>> => {
  const res = await get('/api/get-passenger-list');
  return res;
};

export const savePassenger = async (data: IPassenger): Promise<IResponse> => {
  const res = await post('/api/save-passenger', data);
  return res;
};
