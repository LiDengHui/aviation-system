<template>
  <van-nav-bar title="购票" />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="option.origin"
        name="出发地"
        label="出发地"
        placeholder="出发地"
        :rules="[{ required: true, message: '请填写出发地' }]"
      />
      <van-field
        v-model="option.arrive"
        name="目的地"
        label="目的地"
        placeholder="目的地"
        :rules="[{ required: true, message: '请填写目的地' }]"
      />
      <van-cell
        title="选择单个日期"
        :value="option.date"
        @click="show = true"
      />
      <van-calendar v-model:show="show" @confirm="onConfirm" />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { isValid } from '../api/utils/serverHandle';
import { Dialog } from 'vant';
import { useRouter } from 'vue-router';
const store = useStore();
const option = reactive({
  arrive: '西安',
  origin: '北京',
  date: '2022-3-8',
});

const show = ref(false);

const formatDate = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const onConfirm = (value: Date) => {
  show.value = false;
  option.date = formatDate(value);
};

const router = useRouter();
const onSubmit = async () => {
  const res = await store.dispatch('getFlightListAsync', option);

  if (isValid(res)) {
    router.push('flights');
  } else {
    Dialog.alert({
      message: res.message,
    });
  }
};
</script>
