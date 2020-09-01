import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blogpreviewslatest: [],
    blogpreviewsexperiences: [],
    blogpreviewsreviews: [],
    blogpreviewshacks: [],
    blogpreviewsmaintenance: [],
    blogpreviewstools: []
  },
  mutations: {
    SET_BLOGPREVIEWSLATEST(state, payload) {
      state.blogpreviewslatest = payload;
    },
    SET_BLOGPREVIEWS_EXPERIENCES(state, payload) {
      state.blogpreviewsexperiences = payload;
    },
    SET_BLOGPREVIEWS_REVIEWS(state, payload) {
      state.blogpreviewsreviews = payload;
    },
    SET_BLOGPREVIEWS_HACKS(state, payload) {
      state.blogpreviewshacks = payload;
    },
    SET_BLOGPREVIEWS_MAINTENANCE(state, payload) {
      state.blogpreviewsmaintenance = payload;
    },
    SET_BLOGPREVIEWS_TOOLS(state, payload) {
      state.blogpreviewstools = payload;
    },
  },
  actions: {
    setBlogPreviewsFromPrismic({ commit }, results) {
      if (typeof results[0] !== 'undefined'){
        var tag=results[0].tags[0].toUpperCase();
        commit("SET_BLOGPREVIEWS_" + tag, results);
      } else {
        console.log('there are no results for this category')
      }
    }
  },
  getters: {}
});
