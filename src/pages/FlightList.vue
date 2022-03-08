<template>
 <van-nav-bar title="航班列表" />
 <template v-if="store.state.flights.length>0">
    <FlightCard v-for="item in store.state.flights" :key="item.id" :data="item" @click="onClick(item)"></FlightCard>
 </template>
 <template v-else>
    <van-empty description="没有搜索到航班" />
 </template>
</template>

<script lang="ts" setup>
import FlightCard from "../components/FlightCard.vue";
import {useStore} from 'vuex';
import { IFlight } from '../model/flight';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const onClick = (select: IFlight) => {
  store.commit('setSelectFlight', select);
  router.push("passengerAdd")
}

</script>

<style lang="scss">
</style>