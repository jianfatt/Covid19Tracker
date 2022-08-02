<template>
  <div class="country">
    <div class="country-container first-container">
      <div class="stat overview col col-lg-6">
        <div class="overview-title">
          <h4>
            <font-awesome-icon class="icon" icon="fa-regular fa-flag" />{{ info.country }} Overview
          </h4>
          <p>Share:
            <a href="#">
              <font-awesome-icon class="icon facebook-icon" icon="fa-brands fa-facebook-f" />
            </a>
            <a href="#">
              <font-awesome-icon class="icon twitter-icon" icon="fa-brands fa-twitter" />
            </a>
          </p>
        </div>

        <div class="data-container">

          <div class="confirmed-data">
            <p class="country-total-stat confirmed-stat">{{ numberRegex(info.totalConfirmed) }} </p>
            Confirmed
            <p class="country-daily-stat confirmed-stat">{{ numberRegex(info.dailyConfirmed) }} new cases</p>
          </div>

          <div class="recovered-data">
            <p class="country-total-stat recovered-stat">{{ numberRegex(info.totalRecovered) }} </p>
            Recovered
          </div>

          <div class="deaths-data">
            <p class="country-total-stat deaths-stat">{{ numberRegex(info.totalDeaths) }} </p>
            Deaths
            <p class="country-daily-stat deaths-stat">{{ numberRegex(info.dailyDeaths) }} new deaths</p>
          </div>

        </div>
      </div>

      <div class="stat fatality col">
        <h5>Fatality Rate</h5>
      </div>

      <div class="stat recovery col">
        <h5>Recovery Rate</h5>
      </div>
    </div>

    <div class="country-container second-container">
      <div class="stat critical col">
        <h5>Critical Cases treated in ICU</h5>
        <p class="cases-number">{{ numberRegex(info.totalCritical) }}</p>
        <p><span class="result">{{ percentageCalculation(info.totalCritical / info.totalConfirmed) }}%</span> of total
          cases</p>
      </div>

      <div class="stat daily-receiving col">
        <h5>Daily Cases Receiving Treatment</h5>
        <p class="cases-number">{{ numberRegex(info.activeCases) }}</p>
        <p><span class="result">{{ percentageCalculation(info.activeCases / info.totalConfirmed) }}%</span> of total
          cases
        </p>
      </div>

      <div class="stat daily-confirmed col">
        <h5>Daily Confirmed Cases</h5>
        <p class="cases-number">{{ numberRegex(info.totalConfirmedPerMillionPopulation) }}</p>
        <p>Per Million Population</p>
      </div>
    </div>

    <barChart></barChart>
  </div>
</template>

<script>
import barChart from "@/components/Chart.vue"

export default {
  name: '',
  components: { 
      "barChart": barChart
    },
  data() {
    return {
      info: null,
      countryCode: this.$route.params.countryCode,
      loading: true,
      errored: false,
    }
  },
  created() {
    this.getCountryData();
    this.displayChart();
  },
  methods: {
    getCountryData() {
      const axios = require('axios').default;
      axios
        .get('https://api.coronatracker.com/v3/stats/worldometer/country?countryCode=' + this.countryCode)
        .then(response => {
          this.info = response.data[0]
          console.log(response.data[0])
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
    },
    numberRegex(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    percentageCalculation(statValue) {
      return (statValue * 100).toFixed(1);
    }
  }
}
</script>

<style scoped>
.country {
  width: 100%;
  padding: 0 100px;
}

.country-container {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}

.overview-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.data-container {
  display: flex;
  justify-content: space-around;
  text-align: center;
  color: grey;
  font-weight: 600;
}

.icon {
  padding: 0 5px;
}

.facebook-icon {
  color: #4267B2;
}

.twitter-icon {
  color: #00acee;
}

.cases-number {
  font-size: 20px;
  font-weight: bold;
}

.stat {
  border: 1px solid grey;
  border-radius: 5px;
  margin: 10px;
  padding: 5px 10px;
}

.country-total-stat {
  font-size: 25px;
}

.country-daily-stat {
  font-size: 13px;
}

.confirmed-stat {
  color: red;
}

.recovered-stat {
  color: green;
}

.result {
  color: red;
}
</style>
