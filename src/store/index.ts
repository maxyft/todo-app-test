import Vue from "vue";
import Vuex from "vuex";

import TODO_LIST_STORE from "./todo/todo.store";

import VuexMiddlewarePlugin from "../plugin/store-middleware-plugin";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    TODO_LIST_STORE
  },
  plugins: [VuexMiddlewarePlugin()]
});
