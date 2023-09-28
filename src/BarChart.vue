<template>
    <div>
      <bar-chart :chart-data="data" :options="options"></bar-chart>
    </div>
  </template>
  
  <script>
  import { Bar, mixins } from 'vue-chartjs'
  const { reactiveProp } = mixins
  
  export default {
    extends: Bar,
    mixins: [reactiveProp],
    props: ['options'],
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
  </script>