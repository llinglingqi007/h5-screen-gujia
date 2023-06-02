<script setup lang="ts">
  import { onMounted, ref , h, watch} from 'vue'
  import WelcomeItem from './WelcomeItem.vue'
  import { useScreenStore } from '@/stores'
  import api from '@/api/'
  const store = useScreenStore()
  interface TableData {
    title: string;
    columns: [];
    data: [];
  }
  const state = ref<TableData[]>([])
  // const state1 = ref<TableData>(
    // {
    //   columns: [
    //     {
    //       title: '姓名',
    //       key: 'name',
    //       stylehead: 'font-size:20px;color:red;font-weight:bolder;',
    //       // stylecolumn: 'font-size:10px;color:blue;',
    //       align: 'center'
    //     },
    //     {
    //       title: '性别',
    //       key: 'sex',
    //       render: (record) => {
    //         return h(
    //           'span',
    //           {
    //             style: {
    //               color: record.sex === '女' ? 'blue' : 'green'
    //             }
    //           },
    //           record.sex
    //         );
    //       },
    //       align: 'right'
    //     },
    //     {
    //       title: '学历',
    //       key: 'record',
    //       align: 'right'
    //     }
    //   ],
    //   data: [
    //     {
    //       name: 'Tom',
    //       sex: '男',
    //       record: '小学',
    //     },
    //     {
    //       name: 'Lucy',
    //       sex: '女',
    //       record: '本科'
    //     },
    //     {
    //       name: 'Jack',
    //       sex: '男',
    //       record: '高中'
    //     }
    //   ]
    // }
  // )
  function getWarningFn(){
    api.getWarning({
      time: store.currentDateStr,
    }).then((res: any)=>{
      state.value = [];
      state.value.push(Object.assign({},res.product, {title: '产品事业部预警分析'}))
      state.value.push(Object.assign({},res.market, {title: '营销事业部预警分析'}))
      
      state.value?.forEach(i=> {
        i?.columns?.forEach((j: any, index: number) => {
          if (j.key != 'DEPT_NAME') {
            j.render = (record: any)=>{
              return h(
                'span',
                {
                  style: {
                    height: '100%',
                    display: 'flex',
                    color: Number(record[`${[j.key]}_COLOR`]) > 0 ? 'red' : 'green',
                  },
                },
                Number(record[j.key]).toLocaleString()
              )
            }
            j.align = 'right'
          }
        })
      })
    })
  }
  getWarningFn()
  watch(()=> store.currentDate, ()=> {
    getWarningFn()
  })
</script>
<template>
  <WelcomeItem v-for="item in state" :key="item.title">
      <template #heading>{{item.title}}</template>
        <div class="main-content p-3">
          <nut-table v-if="item?.columns" :columns="item?.columns" :data="item?.data" :bordered="false"></nut-table>
          <NoData v-else></NoData>
        </div>
  </WelcomeItem>
</template>
<style lang="scss" scoped>
  .echart{
    width: 100%;
    height: 300px;
  }
:v-deep(.nut-table){
    min-width: 100%;
    overflow-x: scroll;
    .nut-table__main__head{
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 18px;
        background: linear-gradient(360deg, rgba(0,128,255,0.6) 0%, rgba(0,64,128,0) 50%);
        position: absolute;
        bottom: 0;
        border-radius: 9px;
      }
      .nut-table__main__head__tr__th {
        padding: 0;
        &:nth-child(1) {
          position: relative;
          &::before {
            content: '';
            display: block;
            width: 100%;
            height: 18px;
            background: linear-gradient(180deg, rgba(0,128,255,0.6) 0%, rgba(0,64,128,0) 50%);
            position: absolute;
            top: 0;
            border-radius: 9px;
          }
        }
      }
    }
    // background-color: red!important;
}
</style>
