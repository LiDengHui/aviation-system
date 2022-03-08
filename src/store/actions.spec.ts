import * as actions from './actions';
import { bookFlight, changeStatus, getFlightList } from '../api/index';
import { Commit } from 'vuex';
import { createActionContext } from './utils';
import { StateType } from './state';
import { db } from '../fake/db';
jest.mock('../api/index');

const changeStatusStub = changeStatus as jest.MockedFunction<
  typeof changeStatus
>;

const getFlightListStub = getFlightList as jest.MockedFunction<
  typeof getFlightList
>;

const bookFlightStub = bookFlight as jest.MockedFunction<typeof bookFlight>;

describe('action', () => {
  const commitSpy = jest.fn() as jest.MockedFunction<Commit>;

  const injectee = createActionContext<StateType, StateType>({
    commit: commitSpy,
  });

  beforeEach(() => {
    commitSpy.mockClear();
  });
  it('incrementAsync', async () => {
    changeStatusStub.mockResolvedValueOnce({
      code: 200,
      message: 'ok',
    });

    await actions.incrementAsync(injectee);
    expect(commitSpy).toHaveBeenCalledWith('increment');
  });
  it('decrementAsync', () => {
    actions.decrement(injectee);
    expect(commitSpy).toHaveBeenCalledWith('decrement');
  });

  describe('getFLightListAsync', () => {
    it('getFlightListAsync 200', async () => {
      getFlightListStub.mockResolvedValueOnce(db.getFlightList200 as any);
      const res = await actions.getFlightListAsync(injectee, {
        origin: '北京',
        arrive: '西安',
        time: '2022-03-08',
      });

      expect(commitSpy).toHaveBeenCalledWith(
        'setFlightList',
        db.getFlightList200.data
      );
    });

    it('getFlightListAsync 200 empty', async () => {
      getFlightListStub.mockResolvedValueOnce(db.getFlightList200Empty as any);
      const res = await actions.getFlightListAsync(injectee, {
        origin: '北京',
        arrive: '西安',
        time: '2022-03-08',
      });

      expect(commitSpy).toHaveBeenCalledWith(
        'setFlightList',
        db.getFlightList200Empty.data
      );
    });

    it('getFlightListAsync 401', async () => {
      getFlightListStub.mockResolvedValueOnce(db.getFlightList401 as any);
      const res = await actions.getFlightListAsync(injectee, {
        origin: '北京',
        arrive: '西安',
        time: '2022-03-08',
      });

      expect(commitSpy).not.toBeCalled();
      expect(res).toEqual(db.getFlightList401);
    });
  });

  describe('setBookFlightAsync', () => {
    it('setBookFlightAsync 200', async () => {
      bookFlightStub.mockResolvedValueOnce(db.bookFlights200 as any);
      const injectee = createActionContext<StateType, StateType>({
        commit: commitSpy,
        state: {
          select: db.getFlightList200.data[0],
        },
      });
      const res = await actions.bookFlightAsync(injectee, [
        {
          username: '123',
          userId: '6200000122',
        },
      ]);
      expect(commitSpy).toHaveBeenCalledWith('setBookFlight', {
        id: '1',
      });
    });
  });

  describe('addPassenger', () => {
    it('addPassenger happy pass', async () => {
      const injectee = createActionContext<StateType, StateType>({
        commit: commitSpy,
        state: {
          passengers: [
            {
              username: '123',
              userId: '6200000122',
            },
          ],
        },
      });

      const payload = {
        username: 'list',
        userId: '610322199302052914',
      };
      const res = await actions.addPassenger(injectee, payload);
      expect(commitSpy).toHaveBeenCalledWith('addPassenger', payload);
    });

    it('addPassenger no happy pass', async () => {
      const injectee = createActionContext<StateType, StateType>({
        commit: commitSpy,
        state: {
          passengers: [
            {
              username: '123',
              userId: '6200000122',
            },
          ],
        },
      });

      const payload = {
        username: '123',
        userId: '6200000122',
      };
      const res = await actions.addPassenger(injectee, payload);
      expect(res).toStrictEqual({
        message: '已添加账户，不能重复添加',
      });
    });
  });
});
