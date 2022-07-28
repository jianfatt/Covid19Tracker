<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '@/components/navbar.vue'

export default {
  name: 'App',
  components: {
    navbar
  }
}
</script>

<style>

</style>
