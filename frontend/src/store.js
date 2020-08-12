import Vue from 'vue'
import Vuex from 'vuex'
import VueSocketIO from 'vue-socket.io'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        room: null
    },
    mutations: {
        socket_pool(state, room) {
            state.room = room
        }
    },
    getters: {
      deck(state) {
        if(state.room) {
          return state.room.deck
        }
        return []
      },
      room(state) {
        return state.room
      },
      members(state) {
        if(state.room?.members) {
          return state.room.members
        }
        return []
      }
    }
})

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://localhost:3000',
  vuex: {
    store,
    actionPrefix: 'socket_',
    mutationPrefix: 'socket_'
  }
}))


export default store;