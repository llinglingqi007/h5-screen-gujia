<script setup lang="ts">
  import { onMounted, reactive, ref, watch , toRaw, onUnmounted, nextTick} from 'vue'
  import WelcomeItem from './WelcomeItem.vue'
  import * as echarts from 'echarts';
  import { useScreenStore } from '@/stores'
  import api from '@/api/'
  import ExpectReachChild from './ExpectReachChild.vue';
  const store = useScreenStore()
  import type { PropType } from 'vue';
  import type { dimensionOptionsItem } from './TheWelcome.vue'
  interface Dimension {
    visible: boolean;
    value: string[];
  }
  const props = defineProps({
    dimensionOptions: {
      type: Array as PropType<dimensionOptionsItem[]>,
      default: () => []
    },
    defaultDimensionValue: {
      type: Array as PropType<string[]>,
      default: () => []
    },
  })

  const dimension = reactive<Dimension>({
    visible: false,
    value: props.defaultDimensionValue,
  })
  watch(()=>props.defaultDimensionValue, (val)=>{
    dimension.value = val
    getAchievementFn()
    getTrendAchievementFn()
  })

  watch(()=> store.currentDate, ()=> {
    getAchievementFn()
    getTrendAchievementFn()
  })

  const getParams = () => {
    let [parentDeptName = '', childDeptName =''] = dimension.value;
    const params = {
      time: store.currentDateStr,
      parentDeptName,
      childDeptName,
    }
    return params
  }

  const achievement = ref({
    year: {
      label: '年达成情况',
      key: '同期',
      currentPeriod: '',
      contemporaneousPeriod: '',
    },
    month: {
      label: '本月达成情况',
      key: '同期',
      currentPeriod: '',
      contemporaneousPeriod: '',
    },
  })

  function getAchievementFn() {
    api.getAchievement(getParams()).then((res: any)=>{
      achievement.value = {
        year: {...achievement.value.year, ...res.year},
        month: {...achievement.value.month, ...res.month},
      }
    })
  }
  const events = {
    change(...args: any) {
      dimension.value = args[0]
      getAchievementFn()
      getTrendAchievementFn()
    },
    pathChange(...args: any) {
      console.log('pathChange', ...args);
    }
  };

  const echartsRef = ref<HTMLElement | null>(null);
  let colorText = getComputedStyle(document.documentElement).getPropertyValue('--color-text');
  const options2 = {
    color: [colorText, '#FFD085', '#66BAFF', '#0080FF', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
      // title: {
      //   text: '年达成情况趋势',
      //   textStyle:{
      //     color: colorText,
      //     fontSize: 12
      //   },
      // },
      textStyle:{
        color: colorText,
        fontSize: 10
      },
      grid: {
        left: "12%",
        right: '0',
        top: "16%",
        bottom: "10%",
      },
      legend: {
        show: false,
        icon: "roundRect",
        itemHeight: 2,
        itemWidth: 9,
        textStyle: {
          color: colorText,
        }
      },
    tooltip: {},
    dataset: {
      // 提供一份数据。
      source: [
        ['product', '2015', '2016', '2017'],
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
        ['Cheese Cocoa', 86.4, 65.2, 82.5],
        ['Walnut Brownie', 72.4, 53.9, 39.1]
      ]
    },
    // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
    xAxis: { 
      type: 'category',
      axisLine: {
          show: true,
          lineStyle: {
            color: [colorText],
            opacity: 0.4,
          }
        }, 
      },
    // 声明一个 Y 轴，数值轴。
    yAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: [colorText],
            opacity: 0.4,
          }
        },
        splitLine: {
          lineStyle: {
            color: [colorText],
            opacity: 0.2,
            type: 'dashed'
          }
        },
        axisLabel: {
          show: true,
          formatter: function (value: any) {
              return value + '%';
          }
        }
      },
    valueFormatter: (value:any) => value + '%',
    // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
    series: [{ type: 'line' }, { type: 'line' }, { type: 'line' }]
  };
  const noData = ref(false);
  function getTrendAchievementFn() {
    api.getTrendAchievement(getParams()).then((res: any) =>{
      options2.dataset = res.dataSet;
      if (!res.dataSet) {
        return noData.value = true
      } else {
        noData.value = false
      }
      initEcharts()
    })
  }
  function initEcharts() {
    nextTick(()=>{
      const myChart = echarts.init(echartsRef.value!);
      myChart.setOption(options2);
    })
  }
  window.addEventListener('resize', () => {
    initEcharts()
  })
  onUnmounted(() => {
    echartsRef.value = null;
    window.removeEventListener('resize', () => {
    })
  });
</script>
<template>
  <WelcomeItem>
      <template #heading>预计达成趋势分析</template>
        <div>
          <div class="descption main-content tracking-wider">
            是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 
          </div>
          <div class="info main-content" v-for="(dim,index) in props.dimensionOptions" :key="index">
            <ExpectReachChild :childDimensionOptions="dim"></ExpectReachChild>
          </div>
        </div>
  </WelcomeItem>
</template>
<style lang="scss" scoped>
@import "@/assets/main.scss";

.echart{
  width: 100%;
  height: 170px;
}
  .descption{
    margin: 15px 0;
    // font-size: 11px;
    line-height: 16px;
    color: $color-text;
    padding: 10px 15px;
  }
  .info {
    padding: 15px;
    // .choose-item{
    //   border-radius: 2.66667vw;
    //   border: 1px solid var(--color-text);
    //   flex: 12px;
    //   background-color: #000c21 !important;
    // }
    margin-bottom: 15px;
  }
  .wrap {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    .item {
      width: 150px;
      height: 90px;
      background: linear-gradient(31deg, rgba(0,128,255,0.6) 0%, #0080FF 100%);
      border-radius: 4px;
      color: var(--color-heading);
      text-align: center;
      padding: 10px;
      .item-label {
        font-size: 12px;
      }
      .item-value {
        font-size: 20px;
      }
      .item-line {
        // width: 120px;
        height: 0px;
        border: 1px solid #FFFFFF;
        opacity: 0.2;
        transform: scaleY(0.1);
      }
      .item-key {
        font-size: 12px;
      }
    }
    .item:nth-child(even) {
        background: linear-gradient(31deg, rgba(0,231,255,0.6) 0%, #00E7FF 100%);
    }
  }
:v-deep(.nut-cell .nut-cell__title){
  flex: 0;
}
</style>
