import { createStore } from "vuex";
import User from "@/backend/models/user";
import Token from "@/backend/models/authToken";

export default createStore({
  state: {
    user: User.userModel,
    token: Token.authTokenModel,
    notificationCount: 0,
    activeConversationIndex: -1,
    conversations: [],
    messages: [],
  },
  getters: {
    user(state) {
      return state.user;
    },
    token(state) {
      return state.token;
    },
    activeConversationIndex(state) {
      return state.activeConversationIndex;
    },
    activeConversationId(state) {
      return state.conversations.find(
        (conversation) => conversation.index == state.activeConversationIndex
      )?.conversationId;
    },
    conversations(state) {
      return state.conversations;
    },
    messages(state) {
      return state.messages;
    },
    notificationCount(state) {
      return state.notificationCount;
    },
    getConversationIdByIndex: (state) => (conversationIndex) => {
      return state.conversations.find(
        (conversation) => conversation.index == conversationIndex
      ).conversationId;
    },
    getConversationByIndex: (state) => (conversationIndex) => {
      return state.conversations.find(
        (conversation) => conversation.index == conversationIndex
      );
    },
    getContactConversationById: (state) => (conversationId) => {
      return state.conversations.find(
        (conversation) =>
          conversation.conversationType == "Contact" &&
          conversation.conversationId == conversationId
      );
    },
    getGroupConversationById: (state) => (conversationId) => {
      return state.conversations.find(
        (conversation) =>
          conversation.conversationType == "Group" &&
          conversation.conversationId == conversationId
      );
    },
    getRealIndex: (state) => (conversationIndex) => {
      return state.conversations.findIndex((x) => x.index == conversationIndex);
    },
    // getConversationIndexById: (state) => (conversationId) => {
    //   return state.conversations.findIndex(
    //     (x) => x.conversationId == conversationId
    //   );
    // },
    // getConversationById: (state) => (conversationId) => {
    //   return state.conversations.find(
    //     (x) => x.conversationId == conversationId
    //   );
    // },

    //Method style access
    //token: (state) =>{
    //return state.token;
    //}
  },
  mutations: {
    SET_ACTIVE_CONVERSATION_INDEX(state, conversationIndex) {
      state.activeConversationIndex = conversationIndex;
    },
    SET_USER(state, userData) {
      //set if not null
      state.user.id = userData.id || state.user.id;
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
      state.token = Token.authTokenModel;
    },
    DELETE_TOKEN(state) {
      state.user = User.userModel;
    },
    DELETE_CONVERSATIONS(state) {
      state.conversations = [];
    },
    DELETE_CONVERSATION(state, { conversationIndex }) {
       let index = state.conversations.findIndex((x) => x.index == conversationIndex);
      state.conversations.splice(index, 1);
    },
    ADD_CONVERSATION(state, conversation) {
      state.conversations.push(conversation);
    },
    INCREASE_NOTIFICATION_COUNT(state) {
      state.notificationCount += 1;
    },
    DECREASE_NOTIFICATION_COUNT(state) {
      state.notificationCount -= 1;
    },
    SET_NOTIFICATION_COUNT(state, count) {
      state.notificationCount = count;
    },
    ADD_MESSAGE(state, message) {
      state.messages.push(message);
    },
    SET_MESSAGES(state, messages) {
      state.messages = messages;
    },
    DELETE_MESSAGES(state) {
      state.messages = [];
    },
    SET_LAST_MESSAGE_OF_CONVERSATION(
      state,
      { conversationIndex, lastMessage }
    ) {
      if (conversationIndex != -1) {
       let index = state.conversations.findIndex((x) => x.index == conversationIndex);
        state.conversations[index].lastMessage = lastMessage;
      }
    },
    SET_LAST_MESSAGE_DETAIL_OF_CONVERSATION(state, { lastMessageDetail }) {
      let conversationIndex = lastMessageDetail.conversationIndex;
      if (conversationIndex != -1) {
       let index = state.conversations.findIndex((x) => x.index == conversationIndex);
        state.conversations[index].lastMessage =
          lastMessageDetail.lastMessage ?? "";
        state.conversations[index].lastMessageTimestamp =
          lastMessageDetail.lastMessageTimestamp ?? "";
      }
    },
    TOGGLE_CONVERSATION_FAV(state, { conversationIndex }) {
      if (conversationIndex != -1) {
       let index = state.conversations.findIndex((x) => x.index == conversationIndex);
        state.conversations[index].isFav =
          state.conversations[index].isFav == 1 ? 0 : 1;
      }
    },
    SET_ONLINE_STATUS_OF_CONVERSATION(state, { conversationIndex, isOnline }) {
      if (conversationIndex != -1) {
       let index = state.conversations.findIndex((x) => x.index == conversationIndex);
        state.conversations[index].isOnline = isOnline;
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
    deleteConversation({ commit }, conversationIndex) {
      console.log("Action delete conversationIndex:", conversationIndex);
      commit("DELETE_CONVERSATION", {
        conversationIndex,
      });
    },
    setActiveConversationIndex({ commit }, activeConversationIndex) {
      commit("SET_ACTIVE_CONVERSATION_INDEX", activeConversationIndex);
    },
    addConversation({ commit }, conversation) {
      commit("ADD_CONVERSATION", conversation);
    },
    setLastMessageOfConversation(
      { commit },
      { conversationIndex, lastMessage }
    ) {
      commit("SET_LAST_MESSAGE_OF_CONVERSATION", {
        conversationIndex,
        lastMessage,
      });
    },
    setLastMessageDetailOfConversation({ commit }, lastMessageDetail) {
      commit("SET_LAST_MESSAGE_DETAIL_OF_CONVERSATION", {
        lastMessageDetail,
      });
    },
    toggleConversationFav({ commit }, conversationIndex) {
      commit("TOGGLE_CONVERSATION_FAV", { conversationIndex });
    },
    setOnlineStatusOfConversation({ commit }, { conversationIndex, isOnline }) {
      console.log(
        "Set online status of conversation:",
        conversationIndex,
        " is ",
        isOnline
      );
      commit("SET_ONLINE_STATUS_OF_CONVERSATION", {
        conversationIndex,
        isOnline,
      });
    },
    increaseNotificationCount({ commit }) {
      commit("INCREASE_NOTIFICATION_COUNT");
    },
    decreaseNotificationCount({ commit }) {
      commit("DECREASE_NOTIFICATION_COUNT");
    },
    setNotificationCount({ commit }, notificationCount) {
      commit("SET_NOTIFICATION_COUNT", notificationCount);
    },
    setMessages({ commit }, messages) {
      commit("SET_MESSAGES", messages);
    },
    addMessage({ commit }, message) {
      commit("ADD_MESSAGE", message);
    },
    deleteMessages({ commit }) {
      commit("DELETE_MESSAGES");
    },
  },
  modules: {
    //Can be useful not needed for now
  },
});
