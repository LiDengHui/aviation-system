import { IBookFlight } from '../model/bookFlight';
import { IFlight } from '../model/flight';
import { IPassenger } from '../model/passenger';

export interface StateType {
  count?: number;
  flights?: IFlight[];
  select?: IFlight;
  selectPassengers?: IPassenger[];
  passengers?: IPassenger[];
  bookFlight?: IBookFlight;
}
export const state: StateType = {
  count: 0,
  flights: [],
  select: undefined,
  selectPassengers: [],
  passengers: [],
  bookFlight: undefined,
};
