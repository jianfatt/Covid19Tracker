<template>
  <div class="home">
    <div class="global-container">
      <div class="global-overview col-12 col-lg">
        <div class="global-overview-title">
          <h6 style="color: red">
            <font-awesome-icon class="icon live-icon" icon="fa-regular fa-circle-dot" /> LIVE
          </h6>
          <p>Share:
            <a href="#"><font-awesome-icon class="social-icon facebook-icon" icon="fa-brands fa-facebook-f" /></a>
            <a href="#"><font-awesome-icon class="social-icon twitter-icon" icon="fa-brands fa-twitter" /></a>
          </p>
        </div>

        <div class="dropdown">
          <h5>Stats Overview</h5>
          <button type="button" class="dropdown-btn" data-bs-toggle="dropdown" aria-expanded="false">
            <i>
              <font-awesome-icon class="icon globe-icon" icon="fa-solid fa-globe" />
            </i>
            Global
            <i><font-awesome-icon class="down-icon" icon="fa-solid fa-angle-down" /></i>
          </button>
          <ul class="dropdown-menu">
            <li>
                  <input type="search" class="search-bar form-control" placeholder="Search country" />
            </li>
            <li><router-link :to="{ path: '/' }" class="dropdown-item"><font-awesome-icon class="icon globe-icon" icon="fa-solid fa-globe" /> Global</router-link></li>
            <li><router-link :to="{ path: '/country/us' }" class="dropdown-item"><font-awesome-icon class="icon flag-icon" icon="fa-regular fa-flag" /> USA</router-link></li>
            <li><router-link :to="{ path: '/country/my' }" class="dropdown-item"><font-awesome-icon class="icon flag-icon" icon="fa-regular fa-flag" /> Malaysia</router-link></li>
            <li><router-link :to="{ path: '/country/in' }" class="dropdown-item"><font-awesome-icon class="icon flag-icon" icon="fa-regular fa-flag" /> India</router-link></li>
          </ul>
        </div>
      </div>

      <div class="confirmed col">
        <p class="total-stat">{{ info.totalConfirmed }}</p>
        <p class="stat-title">Confirmed</p>
      </div>

      <div class="recovered col">
        <p class="total-stat">{{ info.totalRecovered }}</p>
        <p class="stat-title">Recovered</p>
      </div>

      <div class="deaths col">
        <p class="total-stat">{{ info.totalDeaths }}</p>
        <p class="stat-title">Deaths</p>
      </div>

      <p class="details"><a class="details-link" href="#">more details</a></p>
    </div>
      
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
        info: null,
        loading: true,
        errored: false
    }
  },
  mounted(){
    const axios = require('axios').default;
    axios
    .get('https://api.coronatracker.com/v3/stats/worldometer/global')
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
</script>

<style>
.home {
  width: 100%;
  padding: 0 100px;
}

.global-container {
  margin: auto;
  border: 1px solid grey;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px;
}

.global-overview-title {
  display: flex;
  justify-content: space-between;
}

.global-overview,
.confirmed,
.recovered,
.deaths{
  margin: 7px;
}

.confirmed,
.recovered,
.deaths {
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  text-align: center;
  position: relative;
}

.confirmed {
  color:#E53E3E;
  background: #FFF5F5;
}

.confirmed .stat-title{
  background: #FED7E7;
}

.recovered {
  color: #38A169;
  background: #F0FFF4;
}

.recovered .stat-title{
  background: #C6F6D5;
}

.deaths {
  color: #718096;
  background: #EDF2F7;
}

.deaths .stat-title{
  background: #E2E8F0;
}

.total-stat {
  padding: 20px 0;
  font-weight:700;
  font-size: 20px;
}

.stat-title {
  width: 100%;
  font-weight: 500;
  margin: 0;
  padding: 5px 0;
  position: absolute;
  bottom: 0;
  border-radius: 0 0 5px 5px;
}

.details {
  width: 100%;
  padding: 10px 8px;
  color: #4299E1;
  font-weight: 700;
  text-align: right;
}

.details-link{
  text-decoration: none;
}

.dropdown-btn {
  width: 100%;
  padding: 5px;
  background: #EDF2F7;
  text-align: left;
  position: relative;
  border: none;
  border-radius: 5px 5px 0 0;
}

.dropdown-btn .down-icon{
  position: absolute;
  top: 5px;
  right: 20px;
}

.dropdown-menu {
  width: 100%;
  background: #EDF2F7; 
}

.dropdown-item {
  display: flex;
  justify-content: left;
  align-items: center;
}

.icon{
  padding: 0 5px 0 10px;
}

.live-icon{
  animation:blinkIcon 3s infinite;
}

@keyframes blinkIcon{
    0%{     color: red;    }
    49%{    color: rgba(255, 0, 0, 0.700) }
    60%{    color: transparent; }
    99%{    color: rgba(255, 0, 0, 0.700)  }
    100%{   color: red;    }
}

.search-bar {
  border: none;
}
</style>
