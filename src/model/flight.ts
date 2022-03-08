import { SeatModel } from '../constant';

export interface IFlight {
  id: string;
  origin: string;
  flyOffOnlyTime: string;
  flyOffTime: string;
  arrive: string;
  arriveOnlyTime: string;
  arriveTime: string;
  airCompany: string;
  equipment: string;
  rate: number;
  equipNo: string;
  productPrices: Record<SeatModel, number>;
}
