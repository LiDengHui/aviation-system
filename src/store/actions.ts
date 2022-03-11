import { StateType } from './state';
import {
  bookFlight,
  changeStatus,
  getFlightList,
  getPassengerList,
  IBookFlightParams,
  IFlightListParams,
  savePassenger,
} from '../api/index';
import { isValid } from '../api/utils/serverhandle';
import { ActionContext, ActionHandler } from 'vuex';
import { IPassenger } from '../model/passenger';

type IActionContext = ActionContext<StateType, StateType>;
export const incrementAsync = async ({ commit }: IActionContext) => {
  const res = await changeStatus();
  if (isValid(res)) {
    commit('increment');
  }
};

export const decrement = ({ commit }: IActionContext) => {
  commit('decrement');
};

export const getFlightListAsync = async (
  { commit }: IActionContext,
  payload: IFlightListParams
) => {
  const res = await getFlightList(payload);
  if (isValid(res) && res.data) {
    commit('setFlightList', res.data);
  }
  return res;
};

export const bookFlightAsync = async (
  { commit, state }: IActionContext,
  selectPassengers: IPassenger[]
) => {
  if (selectPassengers?.length && selectPassengers.length > 0) {
    const options: IBookFlightParams = {
      flightId: state.select?.id!,
      passengers: selectPassengers,
    };
    const res = await bookFlight(options);
    if (isValid(res) && res.data) {
      commit('setBookFlight', res.data);
    } else {
      return res;
    }
  } else {
    return {
      message: '请添加乘客',
    };
  }
};

export const addPassenger = async (
  { commit, state }: IActionContext,
  payload: IPassenger
) => {
  let exist = false;
  if (state.passengers) {
    exist = state.passengers.some((item) => {
      return item.userId === payload.userId;
    });
  }
  if (!exist) {
    const res = await savePassenger(payload);
    if (isValid(res)) {
      commit('addPassenger', payload);
    } else {
      return {
        message: res.message,
      };
    }
  } else {
    return {
      message: '已添加账户，不能重复添加',
    };
  }
};

export const loadPassenger = async ({ commit }: IActionContext) => {
  let res;
  try {
    res = await getPassengerList();
  } catch (e) {
    console.log(e);
  }

  commit('setPassenger', res?.data);
};
