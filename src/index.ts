//import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import 'bootstrap/dist/css/bootstrap.min.css';

// @ts-ignore 
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';

//require('./lib/jsStudy/myPromise.js')
//require('./lib/jsStudy/generator.ts')


createApp(App).use(router).use(store).use(ElementPlus).mount('#app');

//const {log}=console