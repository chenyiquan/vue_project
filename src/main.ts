import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Test from './Test.vue'
import Sort from './Sort.vue'
import Curd from './Curd.vue'
import Book from './Book.vue'
import Count from './Count.vue'
import Converter from './Converter.vue'
import Cell from './Cell.vue'
import Chart from './Chart.vue'
import Test1 from './components/Test1.vue'
import router from './router'
import { createRouter, createWebHistory } from 'vue-router';




//   const app = createApp(App)
//   app.use(createPinia())
//   app.use(router)
//   app.mount('#app')
const test = createApp(Test)
test.use(createPinia())
test.mount('#test')

const sort = createApp(Sort)
sort.use(createPinia())
sort.mount('#sort')

const curd = createApp(Curd)
curd.use(createPinia())
curd.mount('#curd')

const book = createApp(Book)
book.use(createPinia())
book.mount('#book')

const count = createApp(Count)
count.use(createPinia())
count.mount('#count')

const converter = createApp(Converter)
converter.use(createPinia())
converter.mount('#converter')

const cell = createApp(Cell)
cell.use(createPinia())
cell.mount('#cell')

const chart = createApp(Chart)
chart.use(createPinia())
chart.mount('#chart')