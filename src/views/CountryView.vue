<template>
  <div class="country">
    <div class="country-first-container">
      <div class="overview col col-lg-6">
        <div class="overview-title">
          <h4>
            <font-awesome-icon class="flag" icon="fa-regular fa-flag" />{{ info[0].country }} Overview
          </h4>
          <p>Share:
            <font-awesome-icon class="social-icon facebook-icon" icon="fa-brands fa-facebook-f" />
            <font-awesome-icon class="social-icon twitter-icon" icon="fa-brands fa-twitter" />
          </p>
        </div>

        <div class="data-container">

          <div class="confirmed-data">
            <p class="total-stat" style="color:red;">{{ info[0].totalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} </p>
            Confirmed
            <p class="daily-stat" style="color:red;">{{ info[0].dailyConfirmed }} new cases</p>
          </div>

          <div class="recovered-data">
            <p class="total-stat" style="color:green;">{{ info[0].totalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} </p>
            Recovered
          </div>

          <div class="deaths-data">
            <p class="total-stat">{{ info[0].totalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} </p>
            Deaths
            <p class="daily-stat">{{ info[0].dailyDeaths }} new deaths</p>
          </div>

        </div>
      </div>

      <div class="fatality col">
        <h5>Fatality Rate</h5>
      </div>

      <div class="recovery col">
        <h5>Recovery Rate</h5>
      </div>
    </div>

    <div class="country-second-container">
      <div class="critical col">
        <h5>Critical Cases treated in ICU</h5>
        <p class="cases-number">{{ info[0].totalCritical }}</p>
        <p><span style="color:red">{{ ((info[0].totalCritical/info[0].totalConfirmed)*100).toFixed(1) }}%</span> of total cases</p>
      </div>

      <div class="daily-receiving col">
        <h5>Daily Cases Receiving Treatment</h5>
        <p class="cases-number">{{ info[0].activeCases }}</p>
        <p><span style="color:red">{{ ((info[0].activeCases/info[0].totalConfirmed)*100).toFixed(1) }}%</span> of total cases</p>
      </div>

      <div class="daily-confirmed col">
        <h5>Daily Confirmed Cases</h5>
        <p class="cases-number">{{ info[0].totalConfirmedPerMillionPopulation }}</p>
        <p>Per Million Population</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      info: null,
      countryCode:this.$route.params.countryCode,
      loading: true,
      errored: false
    }
  },
  mounted() {
    this.getCountryData();
  },
  methods: {
    getCountryData() {
      const axios = require('axios').default;
      axios
        .get('https://api.coronatracker.com/v3/stats/worldometer/country?countryCode='+this.countryCode)
        .then(response => {
          this.info = response.data
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
      }
  }
}
</script>

<style>
.country {
  width: 100%;
  padding: 0 100px;
}

.country-first-container,
.country-second-container {
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

.flag,
.social-icon {
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

.overview,
.fatality,
.recovery,
.critical,
.daily-receiving,
.daily-confirmed {
  border: 1px solid grey;
  border-radius: 5px;
  margin: 10px;
  padding: 5px 10px;
}

.total-stat {
  font-size: 25px;
}

.daily-stat {
  font-size: 13px;
}
</style>
