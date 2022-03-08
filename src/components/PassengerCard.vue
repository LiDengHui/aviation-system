<template>
  <van-row class="passenger-card">
    <div span=""></div>
    <div>
      <div class="username">乘客:{{ passenger.username }}</div>
      <div class="userId">身份证{{ passenger.userId }}</div>
    </div>
  </van-row>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { IPassenger } from '../model/passenger';

const props = defineProps({
  data: {
    type: Object as PropType<IPassenger>,
    default: () => ({}),
  },
});

const passenger = computed(() => props.data);
</script>

<style lang="scss">
.passenger-card {
  padding: 15px;

  .username {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .userId {
    font-size: 12px;
    color: blue;
  }
}
</style>
