import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrismicVue from "@prismicio/vue";
import linkResolver from "./link-resolver";
import {VueMasonryPlugin} from 'vue-masonry';

Vue.config.productionTip = false;

const accessToken = process.env.VUE_APP_PRISMIC_API_KEY;

Vue.use(PrismicVue, {
  endpoint: window.prismic.endpoint,
  linkResolver,
  apiOptions: {
    accessToken
  }
});

Vue.use(VueMasonryPlugin)

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
