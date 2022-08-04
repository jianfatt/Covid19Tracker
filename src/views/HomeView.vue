<template>
  <div class="home">
    <div class="global-container">
      <div class="global-overview col">
        <div class="global-overview-title">
          <h6 style="color: red">
            <font-awesome-icon class="icon live-icon" icon="fa-regular fa-circle-dot" /> LIVE
          </h6>
          <p>Share:
            <a href="#">
              <font-awesome-icon class="social-icon facebook-icon" icon="fa-brands fa-facebook-f" />
            </a>
            <a href="#">
              <font-awesome-icon class="social-icon twitter-icon" icon="fa-brands fa-twitter" />
            </a>
          </p>
        </div>

        <div class="dropdown">
          <h5>Stats Overview</h5>
          <button type="button" class="dropdown-btn" data-bs-toggle="dropdown" aria-expanded="false">
            <i>
              <font-awesome-icon class="icon globe-icon" icon="fa-solid fa-globe" />
            </i>
            Global
            <i>
              <font-awesome-icon class="down-icon" icon="fa-solid fa-angle-down" />
            </i>
          </button>
          <ul class="dropdown-menu">
            <li>
              <input type="search" class="search-bar form-control" placeholder="Search country" />
            </li>
            <li>
              <router-link :to="{ path: '/' }" class="dropdown-item">
                <font-awesome-icon class="icon globe-icon" icon="fa-solid fa-globe" /> Global
              </router-link>
            </li>
            <li>
              <router-link v-for="countryList in countryList" :to="{ path: 'country/' + countryList.countryCode }"
                class="dropdown-item">
                <font-awesome-icon class="icon flag-icon" icon="fa-regular fa-flag" /> {{ countryList.country }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="stat confirmed  col">
        <p class="total-stat">{{ numberRegex(info.totalConfirmed) }}</p>
        <p class="stat-title">Confirmed</p>
      </div>

      <div class="stat recovered col">
        <p class="total-stat">{{ numberRegex(info.totalRecovered) }}</p>
        <p class="stat-title">Recovered</p>
      </div>

      <div class="stat deaths col">
        <p class="total-stat">{{ numberRegex(info.totalDeaths) }}</p>
        <p class="stat-title">Deaths</p>
      </div>

      <p class="details"><a class="details-link" href="#">more details</a></p>

    </div>

    <div class="table-container">
      <h4 class="header">COUNTRIES AFFECTED</h4>
      <p class="subtext">Sources: WHO, CDC, ECDC, NHC of the PRC, JHU CSSE, DXY, QQ, and various international media</p>
      <p class="hint"><font-awesome-icon icon="fa-solid fa-circle-info"  class="icon hint-icon"/>Hint: Click on a country for more info</p>

      <table class="table">
        <thead class="table-header">
          <tr>
            <th scope="col" class="table-data">Country</th>
            <th scope="col" class="table-data">Confirmed</th>
            <th scope="col" class="table-data">Recovered</th>
            <th scope="col" class="table-data">Deaths</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="countryList in displayCountry">
            <td class="table-data table-country">
              <router-link :to="{ path: 'country/' + countryList.countryCode }" class="country-link">{{
                  countryList.country
              }}</router-link>
            </td>
            <td class="table-data table-stat-data">{{ countryList.totalConfirmed }}</td>
            <td class="table-data table-stat-data">{{ countryList.totalRecovered }}</td>
            <td class="table-data table-stat-data">{{ countryList.totalDeaths }}</td>
          </tr>
        </tbody>
      </table>
      <p class="subtext">* Cases identified on a cruise ship currently in Japanese territorial waters.</p>
      <div class="text-center"><button class="full-list-button" @click="showLessCountries = !showLessCountries">Full List here</button></div>
    </div>

  </div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: "",
  data() {
    return {
      info: [],
      countryList: [],
      loading: true,
      errored: false,
      showLessCountries: true,
    };
  },
  created() {
    this.getGlobalData();
    this.getAllCountryData();
  },
  computed: {
    displayCountry: function () {
      if (this.showLessCountries) {
        return this.countryList.slice(0, 15);
      }
      else {
        return this.countryList;
      }
    }
  },
  methods: {
    numberRegex(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getGlobalData() {
      axios
        .get("https://api.coronatracker.com/v3/stats/worldometer/global")
        .then(response => {
          this.info = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => this.loading = false);
    },
    getAllCountryData() {
      axios
        .get("https://api.coronatracker.com/v3/stats/worldometer/country")
        .then(response => {
          this.countryList = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => this.loading = false);
    },
  },
}
</script>

<style scoped>
.home {
  width: 100%;
  padding: 0 100px;
}

.side-container {
  margin: auto;
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
  padding: 7px 0;
}

.global-overview {
  margin: 7px;
}

.stat {
  margin: 7px;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  text-align: center;
}

.confirmed {
  color: #E53E3E;
  background: #FFF5F5;
}

.confirmed .stat-title {
  background: #FED7E7;
}

.recovered {
  color: #38A169;
  background: #F0FFF4;
}

.recovered .stat-title {
  background: #C6F6D5;
}

.deaths {
  color: #718096;
  background: #EDF2F7;
}

.deaths .stat-title {
  background: #E2E8F0;
}

.total-stat {
  padding: 20px 0;
  font-weight: 700;
  font-size: 20px;
}

.stat-title {
  width: 100%;
  font-weight: 500;
  margin: 0;
  padding: 5px 0;
  border-radius: 0 0 5px 5px;
}

.details {
  width: 100%;
  padding: 10px 8px;
  color: #4299E1;
  font-weight: 700;
  text-align: right;
}

.details-link {
  text-decoration: none;
}

.dropdown-btn {
  width: 100%;
  padding: 5px;
  background: #EDF2F7;
  text-align: left;
  border: none;
  border-radius: 5px 5px 0 0;
}

.down-icon {
  float: right;
  padding: 3px;
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

.icon {
  padding: 0 5px 0 10px;
}

.live-icon {
  animation: blinkIcon 3s infinite;
}

@keyframes blinkIcon {
  0% {
    color: red;
  }

  49% {
    color: rgba(255, 0, 0, 0.700)
  }

  60% {
    color: transparent;
  }

  99% {
    color: rgba(255, 0, 0, 0.700)
  }

  100% {
    color: red;
  }
}

.search-bar {
  border: none;
}

.header{
  color: #108885;
  border-left: 5px solid #108885;
  padding: 10px 0;
  text-indent: 20px;
}

.subtext{
  font-size: 12px;
  color: gray;
  font-weight: 500;
}

.hint{
  color: blue;
  font-size: 12px;
  font-weight: 600;
}

.table-container {
  padding: 30px 0;
}

.table-header {
  text-align: center;
}

.table-stat-data {
  text-align: center;
}

.table-data {
  border: 1px solid grey;
}

.table-country {
  width: 300px;
  background: #EDF2F7;
}

.country-link {
  text-decoration: none;
  color: black;
  font-weight: 600;
}

.table-country:hover {
  background: #108885;
}

.country-link:hover {
  color: white;
}

.full-list-button{
  border: none;
  background: white;
  color: blue;
  font-size: 20px;
  font-weight: 600;
  text-decoration: underline;
}
</style>
