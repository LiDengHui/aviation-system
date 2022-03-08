<template>
  <van-nav-bar title="添加乘客" />
  <div class="main-content">
    <van-checkbox-group v-model="checked" ref="checkboxGroup">
      <van-checkbox
        :name="item.userId"
        v-for="item in store.state.passengers"
        :key="item.userId"
        class="checkbox"
      >
        <PassengerCard :data="item"></PassengerCard>
      </van-checkbox>
    </van-checkbox-group>

    <div>
      <van-button icon="plus" @click="onClick"> 添加用户 </van-button>
    </div>
  </div>
  <div>
    <van-button
      :loading="loading"
      loading-text="加载中..."
      icon="plus"
      type="primary"
      size="large"
      @click="buyTicket"
    >
      确认提交
    </van-button>
  </div>
  <van-popup
    v-model:show="show"
    closeable
    position="bottom"
    :style="{ height: '60%' }"
  >
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="option.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="option.userId"
          name="身份证"
          label="身份证"
          placeholder="身份证"
          :rules="[{ required: true, message: '请填写身份证' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </van-popup>
</template>

<script lang="ts" setup>
import PassengerCard from '../components/PassengerCard.vue';
import { useStore } from 'vuex';
import { reactive, ref } from 'vue';
import { IPassenger } from '../model/passenger';
import { Dialog } from 'vant';
import { useRouter } from 'vue-router';
const store = useStore();

const show = ref(false);

const option = reactive<IPassenger>({
  username: '',
  userId: '',
});
const onClick = () => {
  option.username = '张三测试用';
  option.userId = '610322199302042913';
  show.value = true;
};
const onSubmit = async () => {
  store.dispatch('addPassenger', option);
  show.value = false;
};

store.dispatch('loadPassenger');

const router = useRouter();
const loading = ref(false);
const checked = ref<string[]>([]);
const buyTicket = async () => {
  loading.value = true;
  const passengers = store.state.passengers.filter((item: IPassenger) =>
    checked.value.includes(item.userId)
  );
  const res = await store.dispatch('bookFlightAsync', passengers);
  loading.value = false;
  if (res) {
    Dialog({
      message: res.message,
    });
  } else {
    router.push('payment');
  }
};
</script>

<style lang="scss">
.main-content {
  margin-bottom: 10px;
}

.checkbox {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  box-shadow: 1px 1px 1px #ccc;
  .van-checkbox__label {
    flex: auto;
  }
}
</style>
