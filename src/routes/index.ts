import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../components/Layout.vue';
import Home from '../pages/Home.vue';
import FlightList from '../pages/FlightList.vue';
import PassengerAdd from '../pages/PassengerAdd.vue';
import Payment from '../pages/Payment.vue';
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: 'Home',
        path: '/',
        component: Home,
      },
      {
        name: 'flights',
        path: '/flights',
        component: FlightList,
      },
      {
        name: 'passengerAdd',
        path: '/passengerAdd',
        component: PassengerAdd,
      },
      {
        name: 'payment',
        path: '/payment',
        component: Payment,
      },
    ],
  },
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
