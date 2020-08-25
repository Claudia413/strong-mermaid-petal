<template>
  <div id="app">
    <Navigation />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
    <Footer />
  </div>
</template>

<script>
import "./assets/main.scss";
import Footer from "./components/Footer.vue";
import Navigation from "./components/Navigation.vue";

export default {
  components: {
    Footer,
    Navigation
  }
};
</script>

<style lang="scss"></style>
