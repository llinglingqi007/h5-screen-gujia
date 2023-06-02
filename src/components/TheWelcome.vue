<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import TimeDelivery from './TimeDelivery.vue'
import TableInfo from './TableInfo.vue'
import NotReach from './NotReach.vue'
import TableWarn from './TableWarn.vue'
import ExpectReach from './ExpectReach.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import {ref} from 'vue'
import api from '@/api/'

export interface dimensionOptionsItem {
  text: string;
  value: string;
  children?: dimensionOptionsItem[];
}
const dimensionOptions = ref<dimensionOptionsItem[]>();
const defaultDimensionValue = ref<string[]>();
  // 递归获取数组的第一个节点以及此第一个子节点的value 作为默认值
  function getFirstDimensionFn (arr: dimensionOptionsItem[]) {
    let valList: string[] = [];
    function getValFn (arr: dimensionOptionsItem[]) {
      let val = arr[0]?.value;
      if (val) {
        valList.push(val)
      }
      if (arr[0]?.children) {
        getValFn(arr[0].children)
      } 
    }
    getValFn(arr)
    return valList
  }
  function getDimensionFn () {
    api.getDimension().then((res: any)=>{
      console.log('res', res);
      dimensionOptions.value = res;
      let value = getFirstDimensionFn(res);
      defaultDimensionValue.value = value;

      
    })
  }
  getDimensionFn()

</script>

<template>
  <TimeDelivery :dimensionOptions="dimensionOptions" :defaultDimensionValue="defaultDimensionValue"></TimeDelivery>
  <TableInfo></TableInfo>
  <NotReach :dimensionOptions="dimensionOptions" :defaultDimensionValue="defaultDimensionValue"></NotReach>
  <ExpectReach :dimensionOptions="dimensionOptions" :defaultDimensionValue="defaultDimensionValue"></ExpectReach>
  <TableWarn></TableWarn>
</template>
<style lang="scss">
@import "@/assets/main.scss";
.info {
  background: rgba(0,128,255,0.02);
}
.nut-menu .nut-menu__bar{
  // margin: 0 15px;
  line-height: 21px!important;
  // border-radius: 10px;
  // border: 1px solid $color-text;
  justify-content: space-between;
  background-color: $color-bg!important;
  .nut-menu__item {
    border-radius: 10px;
    border: 1px solid $color-text;
    flex: 0.48!important;
    background-color: #000c21!important;
    .nut-menu__title{
      color: $color-text;
    }
  }
}

</style>
