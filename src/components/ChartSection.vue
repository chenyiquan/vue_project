<template>
    <div >
      <Chart
        :size="{ width: 500, height: 400 }"
        :data="resultArray"
        :margin="margin"
        :direction="direction">
  
        <template #layers>
          <Grid strokeDasharray="2,2" />
          <Line :dataKeys="['name', 'pl']" />
        </template>
      </Chart>
    </div>
    <!-- <h1>{{ resultArray }}</h1> -->
  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue'
  import { Chart, Grid, Line } from 'vue3-charts'

  const props = defineProps({
  resultArray: Array
});

// const totalSum = resultArray.flat().reduce((acc, value) => acc + value, 0);
// const totalDataCount = resultArray.flat().length;
// const averageValue = totalSum / totalDataCount;

// const data = ref(plByMonth)
// const direction = ref<String>('horizontal')
const margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0
})
  </script>