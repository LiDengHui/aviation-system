import { Mutation } from 'vuex';
import { IBookFlight } from '../model/bookFlight';
import { IFlight } from '../model/flight';
import { IPassenger } from '../model/passenger';
import { StateType } from './state';

export const increment: Mutation<StateType> = (state: StateType) =>
  state.count!++;
export const decrement: Mutation<StateType> = (state: StateType) =>
  state.count!--;

export const setFlightList: Mutation<StateType> = (
  state: StateType,
  flights: IFlight[]
) => {
  state.flights = [...flights];
};

export const setSelectFlight: Mutation<StateType> = (
  state: StateType,
  payload: IFlight
) => {
  state.select = { ...payload };
};

export const addPassenger: Mutation<StateType> = (
  state,
  payload: IPassenger
) => {
  state.passengers = state.passengers || [];
  state.passengers?.push({ ...payload });
  localStorage.setItem('passengers', JSON.stringify(state.passengers));
};

export const setPassenger: Mutation<StateType> = (
  state,
  payload?: IPassenger[]
) => {
  if (payload) {
    state.passengers = payload;
  } else {
    const passengers = localStorage.getItem('passengers');
    if (passengers) {
      state.passengers = JSON.parse(passengers);
    }
  }
};

export const setBookFlight: Mutation<StateType> = (
  state,
  payload: IBookFlight
) => {
  state.bookFlight = payload;
};
