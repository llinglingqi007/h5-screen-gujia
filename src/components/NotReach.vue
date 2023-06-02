<script setup lang="ts">
  import { onMounted, reactive, ref, watch , toRaw, onUnmounted, nextTick} from 'vue'
  import WelcomeItem from './WelcomeItem.vue'
  import * as echarts from 'echarts';
  import { useScreenStore } from '@/stores'
  import api from '@/api/'
  import type { PropType } from 'vue';
  import type { dimensionOptionsItem } from './TheWelcome.vue'
  const store = useScreenStore()
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
    getUnachievedFn()
  })

  watch(()=> store.currentDate, ()=> {
    getUnachievedFn()
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

  const events = {
    change(...args: any) {
      dimension.value = args[0]
      getUnachievedFn()
    },
    pathChange(...args: any) {
      console.log('pathChange', ...args);
    }
  };

  const echartsRef1 = ref<HTMLElement | null>(null);
  let colorText = getComputedStyle(document.documentElement).getPropertyValue('--color-text');
  const options2:any = {
    color: ['#00E7FF', '#AB38E8', '#66BAFF', '#0080FF', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
      // title: {
      //   text: '年达成情况趋势',
      //   textStyle:{
      //     color: colorText,
      //     fontSize: 12
      //   },
      // },
      // textStyle:{
      //   color: colorText,
      //   fontSize: 10
      // },
    legend: {
      top: '5%',
      left: 'center',
      show: false,
    },
    tooltip: {},
    dataset: {
      // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
      // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
      // 如果不指定 dimensions，也可以通过指定 series.encode
      // 完成映射，参见后文。
      dimensions: ['product', 'value',],
      source: [
        { product: '开单延期', 'value': 93.7 , 'score': 359, 'colorFlag': 1 },
        { product: '物流延期发货',  'value': 55.1, 'score': 389 },
        { product: '发货延期',  'value': 82.5 , 'score': 448},
        { product: '分货异常',  'value': 39.1 , 'score': 824}
      ]
  },
    // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
    // xAxis: { 
    //   type: 'category',
    //   axisLine: {
    //       show: true,
    //       lineStyle: {
    //         color: [colorText],
    //         opacity: 0.4,
    //       }
    //     }, 
    //   },
    // // 声明一个 Y 轴，数值轴。
    // yAxis: {
    //     type: 'value',
    //     axisLine: {
    //       show: true,
    //       lineStyle: {
    //         color: [colorText],
    //         opacity: 0.4,
    //       }
    //     },
    //     splitLine: {
    //       lineStyle: {
    //         color: [colorText],
    //         opacity: 0.2,
    //         type: 'dashed'
    //       }
    //     },
    //     axisLabel: {
    //       show: true,
    //       formatter: function (value: any) {
    //           return value + '%';
    //       }
    //     }
    //   },
    valueFormatter: (value:any) => value + '%',
    // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
    series: [{ 
      type: 'pie',
      radius: ['48%', '60%'],
      label: {
        show: true,
        color: colorText,
        formatter: '{b}\n {@anomaly_rate}%',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
    }]
  };
  const noData = ref(false);
  function getUnachievedFn() {
    api.getUnachieved(getParams()).then((res: any) =>{
      options2.dataset = res.dataSet;
      if (!res.dataSet || !res.dataSet.source || !res.dataSet.source.length) {
        return noData.value = true
      } else {
        noData.value = false
      }
      initEcharts()
    })
  }
  function initEcharts() {
    nextTick(()=>{
      const myChart = echarts.init(echartsRef1.value!);
      myChart.setOption(options2);
    })
  }
  window.addEventListener('resize', () => {
    initEcharts()
  })
  onUnmounted(() => {
    echartsRef1.value = null;
    window.removeEventListener('resize', () => {
    })
  });
</script>
<template>
  <WelcomeItem>
      <template #heading>未达成情况分析</template>
        <div>
          <div class="info main-content ">
            <nut-cell title="选择维度" :desc="dimension?.value.toString() || '请选择维度'" @click="dimension.visible = true"> </nut-cell>
            <nut-cascader
              title="维度选择"
              v-model:visible="dimension.visible"
              v-model="dimension.value"
              @change="events.change"
              @pathChange="events.pathChange"
              :options="props.dimensionOptions"
            ></nut-cascader>
            <div class="echart-wrap">
              <p class="time"></p>
              <NoData v-show="noData"></NoData>
              <div ref="echartsRef1" class="echart1" v-show="!noData"></div>
            </div>
            <div class="grid grid-cols-2 gap-2 pt-4">
              <div class="grid-info color-head pl-2.6" :class="{'active': Number(item.anomaly_warn)}" v-for="(item,index) in options2?.dataset?.source" :key="index">
                <p class="text-2xs">{{ item.anomaly_name }}</p>
                <p class="text-xs">{{ Number(item.anomaly_val).toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>
  </WelcomeItem>
</template>
<style lang="scss" scoped>
@import "@/assets/main.scss";

.echart1{
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
  .grid-info {
    background: #001C3F;
    border-radius: 7px;
    border: 1px solid transparent;
  }
  .active {
    border: 1px solid var(--vt-c-active);
  }
</style>
