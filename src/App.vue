<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import "./assets/main.scss";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Footer,
  },
};
</script>

<style lang="scss"></style>
