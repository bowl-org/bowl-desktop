import { createStore } from "vuex";
import userModel from "@/backend/models/user";
import tokenModel from "@/backend/models/authToken";

export default createStore({
  state: {
    user: userModel,
    token: tokenModel,
  },
  getters: {
    user(state) {
      return state.user;
    },
    token(state) {
      return state.token;
    },
    //Method style access
    //token: (state) =>{
    //return state.token;
    //}
  },
  mutations: {
    SET_USER(state, userData) {
      //set if not null
      state.user.name = userData.name || state.user.name;
      state.user.email = userData.email || state.user.email;
      state.user.publicKey = userData.publicKey || state.user.publicKey;
      state.user.privateKey = userData.privateKey || state.user.privateKey;
    },
    SET_TOKEN(state, tokenData) {
      state.token.userId = tokenData.userId || state.token.userId;
      state.token.data = tokenData.data || state.token.data;
    },
    DELETE_USER(state){
      state.token = tokenModel;

    },
    DELETE_TOKEN(state){
      state.user = userModel;

    }
  },
  actions: {
    setUser({ commit }, newUserData) {
      commit("SET_USER", newUserData);
    },
    setToken({ commit }, newTokenData) {
      commit("SET_TOKEN", newTokenData);
    },
    deleteToken({ commit }) {
      commit("DELETE_TOKEN");
    },
    deleteUser({ commit }) {
      commit("DELETE_USER");
    },
  },
  modules: {
    //Can be useful not needed for now
  },
});
