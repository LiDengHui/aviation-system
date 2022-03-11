import {
  changeStatus,
  getFlightList,
  bookFlight,
  getPassengerList,
  savePassenger,
} from '.';
import { IFlight } from '../model/flight';
import { get, post } from './utils/request';
import { db } from '../test/db';
jest.mock('./utils/request');

const getStub = get as jest.MockedFunction<typeof get>;

const postStub = post as jest.MockedFunction<typeof post>;

beforeEach(() => {
  jest.clearAllMocks();
});
describe('changeStatus', () => {
  it('happly pass', async () => {
    getStub.mockResolvedValueOnce({
      code: 200,
      message: 'ok',
    });
    const res = await changeStatus();
    expect(res).toEqual({ code: 200, message: 'ok' });
  });

  it('no happly pass', async () => {
    getStub.mockResolvedValueOnce({
      code: 403,
      message: 'bad Request',
    });
    const res = await changeStatus();
    expect(res).toEqual({ code: 403, message: 'bad Request' });
  });
});

describe('getFlightList', () => {
  it('happly pass', async () => {
    const flights = [
      {
        origin: '首都T3',
        flyOffOnlyTime: '08:30',
        flyOffTime: '2022-03-08 08:30',
        arrive: '咸阳T2',
        arriveOnlyTime: '11:05',
        arriveTime: '2022-03-08-11:05',
        airCompany: '中国航空',
        equipment: '波音 737-800(中)',
        rate: 97,
        productPrices: {
          1: 190,
          2: 190,
          3: 240,
          4: 1220,
        },
      },
    ];

    const data = {
      code: 200,
      message: 'ok',
      data: flights,
    };
    getStub.mockResolvedValueOnce(data);

    const res = await getFlightList({
      origin: '北京',
      arrive: '西安',
      time: '2022-03-08',
    });

    expect(res).toEqual(data);
  });

  it('empty pass', async () => {
    const flights: IFlight[] = [];

    const data = {
      code: 200,
      message: 'ok',
      data: flights,
    };
    getStub.mockResolvedValueOnce(data);

    const res = await getFlightList({
      origin: '北京',
      arrive: '西安',
      time: '2022-03-08',
    });

    expect(res).toEqual(data);
  });

  it('other error pass', async () => {
    const data = {
      code: 404,
      message: 'ok',
    };
    getStub.mockResolvedValueOnce(data);

    const res = await getFlightList({
      origin: '北京',
      arrive: '西安',
      time: '2022-03-08',
    });

    expect(res).toEqual(data);
  });
});

describe('bookFlight', () => {
  it('happly pass', async () => {
    const data = {
      code: 200,
      message: 'ok',
      data: {
        id: '1',
      },
    };
    postStub.mockResolvedValueOnce(data);

    const options = {
      flightId: '1',
      passengers: [
        {
          username: '张三',
          userId: '620112232312123132123',
        },
      ],
    };
    const res = await bookFlight(options);
    expect(res).toEqual(data);
  });

  it('no happly pass', async () => {
    postStub.mockResolvedValueOnce({
      code: 403,
      message: 'bad Request',
    });
    const options = {
      flightId: '1',
      passengers: [
        {
          username: '张三',
          userId: '620112232312123132123',
        },
      ],
    };
    const res = await bookFlight(options);
    expect(res).toEqual({ code: 403, message: 'bad Request' });
  });
});

describe('getPassengerList', () => {
  it('happly pass', async () => {
    const data = db.getPassengerList200;
    getStub.mockResolvedValueOnce(data);
    const res = await getPassengerList();
    expect(res).toEqual(data);
  });

  it('no happly pass', async () => {
    getStub.mockResolvedValueOnce({
      code: 403,
      message: 'bad Request',
    });

    const res = await getPassengerList();
    expect(res).toEqual({ code: 403, message: 'bad Request' });
  });
});

describe('save Passenger', () => {
  it('happly pass', async () => {
    postStub.mockResolvedValueOnce(db.savePassenger200);

    const options = {
      username: '张三',
      userId: '620112232312123132123',
    };
    const res = await savePassenger(options);
    expect(res).toEqual(db.savePassenger200);
  });

  it('no happly pass', async () => {
    postStub.mockResolvedValueOnce({
      code: 403,
      message: 'bad Request',
    });
    const options = {
      username: '张三',
      userId: '620112232312123132123',
    };
    const res = await savePassenger(options);
    expect(res).toEqual({ code: 403, message: 'bad Request' });
  });
});
