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
          }]
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
      axios
        .get('https://api.coronatracker.com/v5/analytics/newcases/country?countryCode=' + this.countryCode + '&startDate=' + this.startDate + '&endDate=' + this.endDate)
        .then(response => {
          this.chartData = response.data
          console.log("chart data", response.data)

          let latest_cases = [];
          response.data.forEach((latest) => {
            this.chartOptionsBar.xAxis.data = latest_cases
            latest_cases.push(format(parseISO(latest.last_updated), 'dd MMM'));
            console.log("latest cases", latest.last_updated)
          });

          let confirmed_cases = [];
          response.data.forEach((confirmed) => {
            this.chartOptionsBar.series[0].data = confirmed_cases
            confirmed_cases.push(confirmed.new_infections);
            console.log("confirmed cases", confirmed.new_infections)
          });

          let recovered_cases = [];
          response.data.forEach((recovered) => {
            this.chartOptionsBar.series[1].data = recovered_cases
            recovered_cases.push(recovered.new_recovered);
            console.log("recovered cases", recovered.new_recovered)
          });

          let deaths_cases = [];
          response.data.forEach((deaths) => {
            this.chartOptionsBar.series[2].data = deaths_cases
            deaths_cases.push(deaths.new_deaths);
            console.log("deaths cases", deaths.new_deaths)
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