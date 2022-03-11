import { db } from '../test/db';
import { IBookFlight } from '../model/bookFlight';
import { IFlight } from '../model/flight';
import { IPassenger } from '../model/passenger';
import {
  increment,
  decrement,
  setFlightList,
  addPassenger,
  setBookFlight,
  setPassenger,
} from './mutations';
import { StateType } from './state';

describe('mutations', () => {
  it('increment happly pass', () => {
    let state: StateType = { count: 10 };
    increment(state);
    expect(state.count).toEqual(11);
  });
  it('decrement happly pass', () => {
    let state: StateType = { count: 10 };
    decrement(state);
    expect(state.count).toEqual(9);
  });

  it('setFlightList', () => {
    let state: StateType = { flights: [] };

    const flights: IFlight[] = db.getFlightList200.data as any;

    setFlightList(state, flights);

    expect(state.flights).toEqual(flights);
  });

  it('addPassenger', () => {
    const passengers: IPassenger[] = [];
    let state: StateType = { passengers };

    const passenger: IPassenger = {
      username: '张三',
      userId: '610122199302052897',
    };

    addPassenger(state, passenger);
    expect(state.passengers).toEqual(passengers);
  });

  it('setBookFlight', () => {
    const bookFlight: IBookFlight = {
      id: '123',
    };
    let state: StateType = { bookFlight: undefined };

    setBookFlight(state, bookFlight);
    expect(state.bookFlight).toEqual(bookFlight);
  });

  describe('setPassenger', () => {
    it('happly pass', async () => {
      let state: StateType = { passengers: [] };
      const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
      };

      (global as any).localStorage = localStorageMock;
      const passengers: IPassenger[] = db.getPassengerList200.data;

      setPassenger(state, passengers);

      expect(state.passengers).toStrictEqual(passengers);
    });

    it(' no happly pass', async () => {
      const passengers: IPassenger[] = [];
      let state: StateType = { passengers };
      const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
      };
      (global as any).localStorage = localStorageMock;
      localStorageMock.getItem.mockReturnValue(
        JSON.stringify(db.getPassengerList200)
      );
      setPassenger(state);
      expect(state.passengers).toStrictEqual(db.getPassengerList200);
    });
  });
});
