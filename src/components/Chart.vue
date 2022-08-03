<template>
  <v-chart class="chart" :option="chartOptionsBar"></v-chart>
</template>

<script>
const axios = require('axios').default;

export default {
  name: 'barChart',
  data() {
    return {
      chartOptionsBar: {
        stack: ['total'],
        color: ["#008FFB", "#00E396", "#FEB019"],
        title: { text: "Daily Incidences Chart" },
        legend: {
          show: true,
          bottom: "20px"
        },
        tooltip: {
          show: true
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
      countryCode: "US",
      startDate: "2022-07-01",
      endDate: "2022-07-21",

    }
  },
  created(){
    this.getChartData();
  },
  methods: {
    getChartData() {
      axios
        .get('https://api.coronatracker.com/v5/analytics/trend/country?countryCode=' + this.countryCode + '&startDate=' + this.startDate + '&endDate=' + this.endDate)
        .then(response => {
          this.chartData = response.data
          console.log("chart data", response.data)

          let latest_cases = [];
            response.data.forEach((latest)=> {
              this.chartOptionsBar.xAxis.data = latest_cases
              latest_cases.push(latest.last_updated);
              console.log("latest cases", latest.last_updated)
            });

          let confirmed_cases = [];
            response.data.forEach((confirmed)=> {
              this.chartOptionsBar.series[0].data = confirmed_cases
              confirmed_cases.push(confirmed.total_confirmed);
              console.log("confirmed cases", confirmed.total_confirmed)
            });

            let recovered_cases = [];
            response.data.forEach((recovered)=> {
              this.chartOptionsBar.series[1].data = recovered_cases
              recovered_cases.push(recovered.total_recovered);
              console.log("recovered cases", recovered.total_recovered)
            });

            let deaths_cases = [];
            response.data.forEach((deaths)=> {
              this.chartOptionsBar.series[2].data = deaths_cases
              deaths_cases.push(deaths.total_deaths);
              console.log("deaths cases", deaths.total_deaths)
            });

        });
    }
  }
}
</script>
<style scoped>
.chart {
  height: 100vh;
}
</style>