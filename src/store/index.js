import { createStore } from "vuex";
import userModel from "@/backend/models/user";
import tokenModel from "@/backend/models/authToken";

export default createStore({
  state: {
    user: userModel,
    token: tokenModel,
    activeConversationId: 0,
    conversations: [],
  },
  getters: {
    user(state) {
      return state.user;
    },
    token(state) {
      return state.token;
    },
    activeConversationId(state) {
      return state.activeConversationId;
    },
    conversations(state) {
      return state.conversations;
    },
    getConversationIndexById: (state) => (conversationId) => {
      return state.conversations.findIndex(
        (x) => x.conversationId == conversationId
      );
    },
    getConversationById: (state) => (conversationId) => {
      return state.conversations.find(
        (x) => x.conversationId == conversationId
      );
    },

    //Method style access
    //token: (state) =>{
    //return state.token;
    //}
  },
  mutations: {
    SET_ACTIVE_CONVERSATION_ID(state, conversationId) {
      state.activeConversationId = conversationId;
    },
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
    DELETE_USER(state) {
      state.token = tokenModel;
    },
    DELETE_TOKEN(state) {
      state.user = userModel;
    },
    DELETE_CONVERSATIONS(state) {
      state.conversations = [];
    },
    ADD_CONVERSATION(state, conversation) {
      state.conversations.push(conversation);
    },
    SET_LAST_MESSAGE_OF_CONVERSATION(state, { conversationId, lastMessage,getters }) {
      let conversationIndex =
        getters.getConversationIndexById(conversationId);
      if (conversationIndex != -1) {
        state.conversations[conversationIndex].lastMessage = lastMessage;
      }
    },
    TOGGLE_CONVERSATION_FAV(state, {conversationId, getters}) {
      let conversationIndex =
        getters.getConversationIndexById(conversationId);
      if (conversationIndex != -1) {
        state.conversations[conversationIndex].isFav =
          !state.conversations[conversationIndex].isFav;
      }
    },
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
    deleteConversations({ commit }) {
      commit("DELETE_CONVERSATIONS");
    },
    setActiveConversationId({ commit }, activeConversationId) {
      commit("SET_ACTIVE_CONVERSATION_ID", activeConversationId);
    },
    addConversation({ commit }, conversation) {
      commit("ADD_CONVERSATION", conversation);
    },
    setLastMessageOfConversation({ commit, getters}, { conversationId, lastMessage }) {
      commit("SET_LAST_MESSAGE_OF_CONVERSATION", {
        conversationId,
        lastMessage,
        getters
      });
    },
    toggleConversationFav({ commit, getters }, conversationId) {
      commit("TOGGLE_CONVERSATION_FAV", {conversationId, getters});
    },
  },
  modules: {
    //Can be useful not needed for now
  },
});