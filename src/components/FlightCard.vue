<template>
<van-row class="flight-item"> 
  <van-col span="16" class="info">
    <van-row class="main-content">
      <van-col span="8" class="text-center">
        <div class="time">{{flight.flyOffOnlyTime}}</div>
        <div class="airport">{{flight.origin}}</div>  
      </van-col>
      <van-col span="8" class="text-center">
        ---
      </van-col>
      <van-col span="8" class="text-center"> 
          <div class="time">{{flight.arriveOnlyTime}}</div>
          <div class="airport">{{flight.arrive}}</div>
      </van-col>
    </van-row>
    <div class="company">
      {{flight.airCompany}}{{flight.equipNo}}
    </div>
    <div class="equip">
      {{flight.equipment}}
    </div>
  </van-col>
  <van-col span="8" class="price-info text-center">
    <div class="price">{{price}}</div>
    <div class="price-text">经济舱{{rate}}</div>
  </van-col>

</van-row>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { SeatModel } from '../constant';
import { IFlight } from '../model/flight';

const props = defineProps({
  data: {
    type: Object as PropType<IFlight> , 
    default:()=>({})
  }
})

const flight = computed(()=>props.data)

const price = computed(()=>{
  return flight.value.productPrices[SeatModel.economic] * flight.value.rate/100;
})

const rate = computed(()=>{
  return  flight.value.rate/10+'折'
});
</script>

<style lang="scss">
.flight-item {
  margin-bottom: 10px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  box-shadow: 1px 1px 1px #ccc;  
  padding: 15px;
  .main-content {
    margin-bottom: 10px;
  }
  .time {
    font-size: 18px;
    font-weight: bold;
  }

  .airport {
    font-size: 12px;
  }

  .company {
    font-size: 12px;
    color: blue;
  }

  .equip {
    font-size: 12px;
    color: blue;
  }

  .text-center {
    text-align: center;
  }

  .price-info {
    vertical-align: middle;
    margin: auto;
  }

  .price {
    font-size: 20px;
    font-weight: bold;
    color: orange
  }

  .price-text {
    font-size: 14px;
    font-weight: bold;
    color: green;
  }
}
</style>