import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blogpreviews: []
  },
  mutations: {
    SET_BLOGPREVIEWS(state, payload) {
      state.blogpreviews = payload;
    }
  },
  actions: {
    setBlogPreviewsFromPrismic({ commit }, results) {
      commit("SET_BLOGPREVIEWS", results);
    }
  },
  getters: {}
});
