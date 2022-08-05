<template>
  <v-chart class="chart" :option="chartOptionsBar"></v-chart>
</template>

<script>
const axios = require('axios').default;

import { format, parseISO, endOfToday, subWeeks } from 'date-fns'

export default {
  name: 'barChart',
  data() {
    return {
      chartOptionsBar: {
        stack: ['total'],
        color: ["#008FFB", "#00E396", "#FEB019"],
        title: { text: "Daily Incidences Chart", subtext:"(-)" },
        legend: {
          show: true,
          bottom: "20px"
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          }
        },
        xAxis: {
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar',
            name: 'Confirmed',
            data: []
          },
          {
            type: 'bar',
            name: 'Recovered',
            data: []
          },
          {
            type: 'bar',
            name: 'Deaths',
            data: []
          }],
      },
      countryCode: this.$route.params.countryCode,
      startDate: format(subWeeks(endOfToday(), 8), 'yyyy-MM-dd'),
      endDate: format(endOfToday(), 'yyyy-MM-dd'),
      loading: true,
      errored: false,

    }
  },
  created() {
    this.getChartData();
  },
  methods: {
    getChartData() {
      axios({
        method: 'GET',
        url: 'https://api.coronatracker.com/v5/analytics/newcases/country',
        params:{
          countryCode: this.countryCode,
          startDate: this.startDate,
          endDate: this.endDate
        }
      })
        .then(response => {
          this.chartData = response.data
          response.data.forEach((item) => {
            this.chartOptionsBar.xAxis.data.push(format(parseISO(item.last_updated), 'dd MMM'));
            this.chartOptionsBar.series[0].data.push(item.new_infections);
            this.chartOptionsBar.series[1].data.push(item.new_recovered);
            this.chartOptionsBar.series[2].data.push(item.new_deaths);
          });

        }).catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
    },
    
  }
}
</script>
<style scoped>
.chart {
  height: 500px;
}
</style>