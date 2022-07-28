<template>
  <div class="detail">
    <div class="detail-first-container">
      <div class="overview col col-lg-6">
        <div class="overview-title">
        <h4><font-awesome-icon class="flag" icon="fa-regular fa-flag" />{{ countryStat['country'] }} Overview</h4>
        <p>Share: <font-awesome-icon class="social-icon facebook-icon" icon="fa-brands fa-facebook-f" /><font-awesome-icon class="social-icon twitter-icon" icon="fa-brands fa-twitter" /></p>
        </div>

        <div class="data-container">

          <div class="confirmed-data">
            <p class="total-stat" style="color:red;">{{ countryStat['totalConfirmed'] }} </p>
            Confirmed
            <p class="daily-stat" style="color:red;">{{ countryStat['dailyConfirmed'] }} new cases</p>
          </div>

          <div class="recovered-data">
            <p class="total-stat" style="color:green;">{{ countryStat['totalRecovered'] }} </p>
            Recovered
          </div>

          <div class="deaths-data">
            <p class="total-stat">{{ countryStat['totalDeaths'] }} </p>
            Deaths
            <p class="daily-stat">{{ countryStat['dailyDeaths'] }} new deaths</p>
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

    <div class="detail-second-container">
      <div class="critical col">
        <h5>Critical Cases treated in ICU</h5>
        <p class="cases-number">{{ countryStat['totalCritical'] }}</p>
        <p><span style="color:red">0.0%</span> of total cases</p>
      </div>

      <div class="daily-receiving col">
        <h5>Daily Cases Receiving Treatment</h5>
        <p class="cases-number">{{ countryStat['activeCases'] }}</p>
        <p><span style="color:red">1.0%</span> of total cases</p>
      </div>

      <div class="daily-confirmed col">
        <h5>Daily Confirmed Cases</h5>
        <p class="cases-number">{{ countryStat['totalConfirmedPerMillionPopulation'] }}</p>
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
      countryStat: {
        "countryCode": "my",
        "country": "Malaysia",
        "lat": "4.210484",
        "lng": "101.975766",
        "totalConfirmed": 4651651,
        "totalDeaths": 35914,
        "totalRecovered": 4567485,
        "dailyConfirmed": 0,
        "dailyDeaths": 0,
        "activeCases": 48252,
        "totalCritical": 54,
        "totalConfirmedPerMillionPopulation": 140031,
        "totalDeathsPerMillionPopulation": 1081,
        "FR": "0.7721",
        "PR": "98.1906",
        "lastUpdated": "2022-07-25T01:36:00.000Z"
      }
    }
  }
}
</script>

<style>

.detail{
  width: 100%;
  padding: 0 50px;
}

.detail-first-container,
.detail-second-container {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}

.overview-title{
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

.flag, .social-icon{
  padding: 0 5px;
}

.facebook-icon{
  color: #4267B2;
}

.twitter-icon{
  color: #00acee;
}

.cases-number{
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

.total-stat{
  font-size: 25px;
}

.daily-stat{
  font-size: 13px;
}
</style>