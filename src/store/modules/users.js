import { firebaseAuth } from '../../firebase'

const state = {
  user: {
    loggedIn: null,
    data: null
  },
  error: null
}

const getters = {
  loggedIn: state => state.user.loggedIn,
  currentUser: state => state.user.data,
  errorMessage: state => state.error
}

const mutations = {
  SET_LOGGED_IN(state, value) {
    state.user.loggedIn = value
  },
  SET_USER(state, data) {
    state.user.data = data
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  persistSignIn ({ commit }, email) {
    commit('SET_LOGGED_IN', true)
    commit('SET_USER', email)
  },
  async register ({commit}, user) {
    try {
      const userData = await firebaseAuth.createUserWithEmailAndPassword(
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
      commit('SET_ERROR', "An error occurred registering your account, please try again")
    }
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
      if (error.code == "auth/user-not-found" || error.code == "auth/wrong-password") {
        commit('SET_ERROR', "Invalid credentials, please check your email and password and try again")
      } else if (error.code == "auth/too-many-requests") {
        commit('SET_ERROR', "There were too many unsuccessful login attempts, please try again later")
      } else {
        commit('SET_ERROR', "An error occurred logging you in, please try again")
      }
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