import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'vue-cookies'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token:  Cookie.get("token"),
    userId:  Cookie.get("userId"),
    userType:  Cookie.get("userType"),
    // userRole:  Cookie.get("userRole"),
  },
  mutations: {
    saveToken: function (state, userToken) {
      state.token = userToken;
      Cookie.set("token", userToken, "30min")
    },
    saveUserDetail: function (state, userId,userType) {
      state.userId = userId;
      state.userType = userType;
      Cookie.set("userId", userId, "30min")
      Cookie.set("userType", userType, "30min")
    },
    clearToken: function (state) {
      state.token = null;
      Cookie.remove("token");
    },
    deleteUserDetail: function (state) {
      state.userId = null;
      state.userType = null;
      Cookie.remove("userId");
      Cookie.remove("userType");
    }
  }
})
export default store
