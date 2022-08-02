<template>
  <v-chart class="chart" :option="chartOptionsBar"></v-chart>
</template>

<style>
</style>

<script>
export default {
  name: 'barChart',
  data() {
    return {
      chartOptionsBar: {
        stack: ['total'],
        color:  [ "#008FFB", "#00E396", "#FEB019"],
        title: {text: "Daily Incidences Chart"},
        legend: {
          show:true, 
          bottom:"20px"
          },
        tooltip:{
          show:true
          },
        xAxis: {
          data: ['a', 'b', 'c', 'd']
        },
        yAxis: {
          type: 'value'
        },
        series: [
        {
          type: 'bar',
          name:'Confirmed',
          data: [63, 75, 24, 92]
        },
        {
          type: 'bar',
          name:'Recovered',
          data: [63, 75, 24, 92]
        },
        {
          type: 'bar',
          name:'Deaths',
          data: [63, 75, 24, 92]
        }]
      }

    }
  }
}
</script>
<style scoped>
.chart {
  height: 100vh;
}
</style>