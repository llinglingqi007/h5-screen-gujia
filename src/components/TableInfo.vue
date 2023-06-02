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
  function getDeptAchievementFn(){
    api.getDeptAchievement({
      time: store.currentDateStr,
    }).then((res: any)=>{
      state.value = [];
      state.value.push(Object.assign({},res.product, {title: '产品事业部达成情况'}))
      state.value.push(Object.assign({},res.market, {title: '营销事业部达成情况'}))
      
      state.value?.forEach(i=> {
        i?.columns?.forEach((j: any, index: number) => {
          if (j.key === 'QTY_00') {
            j.render = (record: any)=>{
              return h(
                'span',
                Number(record.QTY_00).toLocaleString()
              )
            }
          }
          if (j.key === 'QTY_01') {
            j.render = (record: any)=>{
              return h(
                'span',
                Number(record.QTY_01).toLocaleString()
              )
            }
          }
          if (j.key === 'QTY3') {
            j.render = (record: any) => {
              return h(
                  'div',
                  {
                    style: {
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                    },
                  },
                  [
                      h(
                        'div',
                        {
                          style: {
                            width: record.QTY3 + '%',
                            height: '10px',
                            background: record.COLOR_FLAG ? 'linear-gradient(270deg, #0080FF 0%, rgba(0,64,128,0.1) 100%)' : 'linear-gradient(270deg, #FF0000 0%, rgba(128,0,0,0.1) 100%)'
                          }
                        },
                      ),
                      h(
                        'span',
                        {
                          style: {
                            width: '20px',
                            color: record.COLOR_FLAG ? '#0080FF' : '#FF0000',
                            marginLeft: '4px'
                          }
                        },
                        // Number(record.QTY3 * 100).toFixed(1) + '%'
                        record.QTY3 + '%'
                      ),
                  ]
                );
              }
              j.stylehead = 'min-width: 120px;'
            }
        })
      })
    })
  }
  getDeptAchievementFn()
  watch(()=> store.currentDate, ()=> {
    getDeptAchievementFn()
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
  }
</style>
