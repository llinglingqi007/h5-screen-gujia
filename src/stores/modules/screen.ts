import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useScreenStore = defineStore('screen', () => {
  const currentDate = ref(new Date());
  const currentDateStr = computed(() => currentDate.value.getFullYear() + '-' + String(currentDate.value.getMonth() + 1).padStart(2, '0'))
  const setCurrentDate = (time: Date)=>{
    currentDate.value = time
  }


  return { currentDate, currentDateStr, setCurrentDate }
})
