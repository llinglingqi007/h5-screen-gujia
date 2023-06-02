import './assets/main.scss'
import 'virtual:uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import NoData from '@/components/NoData/index.vue'
import router from './router'
import { IconFont } from '@nutui/icons-vue';
import '@nutui/icons-vue/dist/style_iconfont.css';
import "@nutui/nutui/dist/style.css";
// import '@nutui/nutui/dist/packages/notify/style';
// import '@nutui/nutui/dist/packages/toast/style';

import { Button } from "@nutui/nutui";
import { Menu, MenuItem } from '@nutui/nutui';
import { Table } from '@nutui/nutui';
import { DatePicker } from '@nutui/nutui';
import { Popup } from '@nutui/nutui';
import { ActionSheet  } from '@nutui/nutui';
import { Cascader } from '@nutui/nutui';
import { Cell } from '@nutui/nutui';
import { Toast  } from '@nutui/nutui';

const app = createApp(App)

app.component('NoData', NoData)
app.use(createPinia())
app.use(router)
app.use(IconFont);
app.use(Button)
app.use(Menu);
app.use(MenuItem);
app.use(Table);
app.use(DatePicker);
app.use(Popup);
app.use(ActionSheet);
app.use(Cascader);
app.use(Cell);
app.use(Toast);
app.mount('#app')
