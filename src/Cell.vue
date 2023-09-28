<!--
https://eugenkiss.github.io/7guis/tasks/#cells
-->

<script setup>
import Cell from './components/Cell.vue'
import { cells } from './stores/store.js'
import { ref,defineComponent,computed } from 'vue'
import ChartSection from './components/ChartSection.vue' 
import BarChartSection from './components/BarChartSection.vue'
import { Chart, Grid, Line } from 'vue3-charts'
import { plByMonth } from './data'

const cols = cells.map((_, i) => String.fromCharCode(65 + i))

const parentData = JSON.stringify(cells);

const sumArray = computed(() => {
  return cells[0].map((_, colIndex) =>
    cells.reduce((sum, row) => sum + (Number(row[colIndex]) || 0), 0)
  );
});

// const totalSum = sumArray.value.reduce((acc, sum) => acc + sum, 0);
// const totalDataCount = cells.value.length > 0 ? (cells.value.length * cells.value[0].length) : 0;
// const averageValue = totalDataCount > 0 ? totalSum / totalDataCount : 0;

const resultArray = computed(() => {
  return sumArray.value.map((sum, index) => ({
    name: String(index),
    pl: sum,
    avg: sum / cells.length  
  }));
});

// function toggleTab1(tabId) {
//       const tabContent = document.getElementById(tabId);
//       if (tabContent.style.display === "none") {
//         tabContent.style.display = "block";
//       } else {
//         tabContent.style.display = "none";
//       }
//     }

// const data = ref(plByMonth)
// const direction = ref<String>('horizontal')
// const margin = ref({
//   left: 0,
//   top: 20,
//   right: 20,
//   bottom: 0
// })

</script>

<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="c in cols">{{ c }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in cells[0].length">
        <th>{{ i - 1 }}</th>
        <td v-for="(c, j) in cols">
          <Cell :r="i - 1" :c="j"></Cell>
        </td>
      </tr>
    </tbody>
  </table>

 <h1>{{ cells }}</h1>
 <h1>{{ sumArray }}</h1>
 <!-- <h1>{{ resultArray }}</h1> -->
<h1>{{ averageValue }}</h1>
  <div>
    <button class="menu-item" onclick="toggleTab('chart1')">折れ線グラフ</button>
    <button class="menu-item" onclick="toggleTab('chart2')">棒グラフ</button>
    <canvas ref="barChartCanvas" width="400" height="300"></canvas>
  </div>
 

  <div class="content" id="chart1" style="display: none;">
    <ChartSection :resultArray="resultArray" />
  <!-- <Chart
    :size="{ width: 500, height: 400 }"
    :data="resultArray"
    :margin="margin"
    :direction="direction">

    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Line :dataKeys="['name', 'pl']" />
    </template>
  </Chart> -->
</div>

<div class="content" id="chart2" style="display: none;">
    <BarChartSection :resultArray="resultArray" />
    </div>
</template>

<style>
body {
  margin: 0;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}

th {
  background-color: #ffffff;
  color: red;
}

tr:first-of-type th {
  width: 100px;
  color: #070707;
}

tr:first-of-type th:first-of-type {
  width: 25px;
  color: red;
}

td {
  border: 1px solid #ccc;
  height: 1.5em;
  overflow: hidden;
}
</style>