<template>
    <div class="table-container">
      <h4 class="header">COUNTRIES AFFECTED</h4>
      <p class="subtext">Sources: WHO, CDC, ECDC, NHC of the PRC, JHU CSSE, DXY, QQ, and various international media</p>
      <p class="hint">
        <font-awesome-icon icon="fa-solid fa-circle-info" class="icon hint-icon" />Hint: Click on a country for more
        info
      </p>

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
          <tr v-for="country in countryList">
            <td class="table-data table-country">
              <router-link :to="{ path: 'country/' + country.countryCode }" class="country-link">{{
                  country.country
              }}</router-link>
            </td>
            <td class="table-data table-stat-data">{{ numberRegex(country.totalConfirmed) }}</td>
            <td class="table-data table-stat-data">{{ numberRegex(country.totalRecovered) }}</td>
            <td class="table-data table-stat-data">{{ numberRegex(country.totalDeaths) }}</td>
          </tr>
        </tbody>
      </table>
      <p class="subtext">* Cases identified on a cruise ship currently in Japanese territorial waters.</p>
      <div class="text-center">
        <button class="full-list-button" @click="toggleCountryList()">{{ toggleText }}</button>
      </div>
    </div>
</template>

<script>
const axios = require('axios').default;
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCircleInfo)
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"

export default {
  name: 'casesTable',
  components: { 
      'font-awesome-icon': FontAwesomeIcon
    },
  data() {
    return {
      countryList: [],
      loading: true,
      errored: false,
      showLessCountries: true,

      countryLimitCount: 15
    };
  },
  created() {
    this.getAllCountryData();
  },
  computed: {
    // countryList: function () {
    //   if (this.showLessCountries) {
    //     return this.countryList.slice(0, 15);
    //   }
    //   else {
    //     return this.countryList;
    //   }
    // }
    toggleText() {
      return this.showLessCountries == true ? "Full List Here" : "Hide List";
    }
  },
  methods: {
    numberRegex(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getAllCountryData() {
      axios({
        method: 'GET',
        url: 'https://api.coronatracker.com/v3/stats/worldometer/country',
        params: {
          limit: this.countryLimitCount
        }
      })
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
    toggleCountryList() {
      this.countryLimitCount = this.showLessCountries == false ? 15 : null; 
      this.getAllCountryData();
      this.showLessCountries = !this.showLessCountries
    }
  },
}
</script>

<style scoped>
.header {
  color: #108885;
  border-left: 5px solid #108885;
  padding: 10px 0;
  text-indent: 20px;
}

.subtext {
  font-size: 12px;
  color: gray;
  font-weight: 500;
}

.hint {
  color: #3182CE;
  font-size: 12px;
  font-weight: 600;
}

.table-container {
  padding: 30px 0;
}

.table {
  text-align: center;
}

.table-data {
  border: 1px solid grey;
  font-weight: bold;
}

.table-country {
  width: 300px;
  background: #EDF2F7;
}

.country-link {
  display: block;
  color: black;
  font-weight: 600;
  text-decoration: none;
}

.table-country:hover {
  background: #108885;
}

.country-link:hover {
  color: white;
}

.full-list-button {
  border: none;
  background: white;
  color: #4299E1;
  font-size: 20px;
  font-weight: 600;
  text-decoration: underline;
}
</style>