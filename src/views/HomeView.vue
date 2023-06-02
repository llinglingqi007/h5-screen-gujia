<script setup lang="ts">
import { ref } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import { useScreenStore } from '@/stores'

const store = useScreenStore()
// 解构出来，不让v-model改变store.currentDate
const { currentDate } = store
const show = ref(false);
const popupConfirm = ({ selectedValue } : any)=> {
  // popupDesc.value = selectedOptions.map((val: any) => val.text).join('');
  store.setCurrentDate(new Date(selectedValue))
  show.value = false;
}
const popupCancel = ()=>{
  show.value = false;
}
</script>

<template>
  <main class="color-bg px-3 pb-3 main">
    <div class="page-header">
      <span class="page-time" @click="show = true">{{ store.currentDateStr }}<IconFont name="down-arrow" size="12"></IconFont></span>
      <p class="page-title"></p>
    </div>
    <TheWelcome />
  </main>
  <nut-popup position="bottom" v-model:visible="show">
    <nut-date-picker
      v-model="currentDate"
      @confirm="popupConfirm"
      @cancel="popupCancel"
      type="year-month"
    >
    </nut-date-picker>
  </nut-popup>
</template>
<style lang="scss">
@import "@/assets/main.scss";
.main {
  background-image: url(../assets/images/home-bg.png);
  background-repeat: no-repeat;
  background-size: contain;
  .main-content {
    background-color: $color-content-bg;
    border-radius: 7px;
    .nut-cell{
      padding: 4px 15px;
      background: #000c21;
      color: $color-text;
      .nut-cell__value {
        color: $color-head;
      }
    }
  }
}
.page-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  padding: 8px 0;
  margin-bottom: 105px;
  .page-title {
    width: 100px;
    height: 12px;
    background-image: url(../assets/images/home-title.png);
    background-repeat: no-repeat;
    background-size: contain;
  }
  .page-time {
    position: absolute;
    left: 15px;
    width: 99px;
    height: 28px;
    background: rgba(0,128,255,0.02);
    border-radius: 14px;
    color: $color-text;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 12px;
  }
}
.nut-table__main__body {
  .nut-table__main__body__tr__td {
    color: $color-head;
  }
}
</style>
