<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import "./assets/main.scss";
import Footer from "./components/Footer.vue"

export default {
  components: {
    Footer
  }
};
</script>

<style lang="scss"></style>
