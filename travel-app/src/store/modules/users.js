export default {
  namespaced: true,

  state: {
    users: [],
  },

  getters: {
    getUsers(state) {
      return state.users;
    },
  },

  actions: {
    addUser({ commit, getters }, username) {
      const existingUser = getters.getUsers
        .find(record => record.username === username);
      if (existingUser) {
        return;
      }
      commit('pushUserToState', { username: username });
    },

    removeUser({ commit, getters }, username) {
      const existingUser = getters.getUsers
        .find(record => record.username === username);
      if (!existingUser) {
        return;
      }
      commit('popUserFromState', { username: username });
    }
  },

  mutations: {
    pushUserToState(state, user) {
      state.users.push(user);
    },

    popUserFromState(state, user) {
      const userToRemove = state.users
        .find(record => record.username === user.username);
      if (!userToRemove) {
        return;
      }
      state.users = state.users
        .filter(record => record.username !== userToRemove.username);
    }
  }
}