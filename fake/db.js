module.exports = {
  getFlightList200: {
    code: 200,
    message: 'ok',
    data: [
      {
        id: '1',
        origin: '首都T3',
        flyOffOnlyTime: '08:30',
        flyOffTime: '2022-03-08 08:30',
        arrive: '咸阳T2',
        arriveOnlyTime: '11:05',
        arriveTime: '2022-03-08-11:05',
        airCompany: '中国航空',
        equipNo: 'CA1289',
        equipment: '波音 737-800(中)',
        rate: 97,
        productPrices: {
          0: 190,
          1: 290,
        },
      },

      {
        id: '2',
        origin: '首都T3',
        flyOffOnlyTime: '07:25',
        flyOffTime: '2022-03-08 07:25',
        arrive: '咸阳T2',
        arriveOnlyTime: '09:55',
        arriveTIme: '2022-03-08-09:55',
        airCompany: '中国航空',
        equipNo: 'CA1231',
        equipment: '波音 737-800(中)',
        rate: 80,
        productPrices: {
          0: 190,
          1: 290,
        },
      },
      {
        id: '3',
        origin: '大兴国际',
        flyOffOnlyTime: '11:00',
        flyOffTime: '2022-03-08 11:00',
        arrive: '咸阳T3',
        arriveOnlyTime: '13:15',
        arriveTime: '2022-03-08-13:15',
        airCompany: '南方航空',
        equipNo: 'CZ8823',
        equipment: '空中客车 A320(中)',
        rate: 60,
        productPrices: {
          0: 190,
          1: 240,
        },
      },

      {
        id: '4',
        origin: '首都T3',
        flyOffOnlyTime: '11:55',
        flyOffTime: '2022-03-08 11:55',
        arrive: '咸阳T2',
        arriveOnlyTime: '14:30',
        arriveTime: '2022-03-08-14:30',
        airCompany: '中国国航',
        equipNo: 'CA1201',
        equipment: '空中客车 A321(中)',
        rate: 10,
        productPrices: {
          0: 190,
          1: 290,
        },
      },
    ],
  },
  getFlightList200Empty: {
    code: 200,
    message: 'ok',
    data: [],
  },
  getFlightList400: {
    code: 403,
    message: '用户无权限访问',
  },
  getFlightList401: {
    code: 401,
    message: '用户登陆过期',
  },
  getFlightList500: {
    code: 500,
    message: '服务端未知异常',
  },

  bookFlights200: {
    code: 200,
    message: 'ok',
    data: {
      id: '1',
    },
  },
  getPassengerList200: {
    code: 200,
    message: 'ok',
    data: [
      {
        username: '张三',
        userId: '6103221993020523456',
      },
      {
        username: '王武',
        userId: '610322199302052914',
      },
    ],
  },
  getPassengerList401: {
    code: 401,
    message: '用户无权限访问',
  },

  savePassenger200: {
    code: 200,
    message: 'ok',
  },
};
