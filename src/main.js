import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import PrismicVue from '@prismicio/vue'
import linkResolver from './link-resolver'

Vue.config.productionTip = false;

const accessToken = process.env.VUE_APP_PRISMIC_API_KEY;

Vue.use(PrismicVue, {
  endpoint: window.prismic.endpoint,
  linkResolver,
  apiOptions: {
    accessToken
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
