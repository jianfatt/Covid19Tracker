<template>
    <div class="nav">
        <nav class="navbar navbar-expand-lg">
            <div class="nav-wrapper">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link"><router-link to="/">Home</router-link></a>
                        <a class="nav-link"><router-link to="/detail">Detail</router-link></a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style>
nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
