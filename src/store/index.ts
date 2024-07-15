import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      count: 112
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

