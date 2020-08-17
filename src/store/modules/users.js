import { firebaseAuth } from '../../firebase'

const state = {
  user: {
    loggedIn: null,
    data: null
  }
}

const getters = {
  currentUser: state => state.user.data,
  loggedIn: state => state.user.loggedIn
}

const mutations = {
  SET_LOGGED_IN(state, value) {
    state.user.loggedIn = value
  },
  SET_USER(state, data) {
    state.user.data = data
  }
}

const actions = {
  signInFromCookie ({ commit }, email) {
    commit('SET_LOGGED_IN', true)
    commit('SET_USER', email)
  },
  async signIn ({ commit }, user) {
    try {
      const userData = await firebaseAuth.signInWithEmailAndPassword(
        user.email,
        user.password
      )
      commit('SET_LOGGED_IN', user !== null)

      if (userData.user) {
        commit('SET_USER', { email: user.email })
      } else {
        commit('SET_USER', null)
      }
    } catch (error) {
      console.log(error.message)
    }
  },
  async signOut ({ commit }) {
    try {
      await firebaseAuth.signOut()
    } catch (error) {
      console.log(error.message)
    }
    commit('SET_USER', null)
    commit('SET_LOGGED_IN', null)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}