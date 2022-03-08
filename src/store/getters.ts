import { Getter } from 'vuex';
import { StateType } from './state';

export const evenOrOdd: Getter<StateType, StateType> = (state) =>
  state.count! % 2 === 0 ? 'even' : 'odd';
