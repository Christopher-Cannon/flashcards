import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import decks from './modules/decks'
// import { vuexfireMutations } from 'vuexfire'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    users,
    decks
  }
})