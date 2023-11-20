export default {
  namespaced: true,

  state: {
    bookmarks: [],
  },

  getters: {
    getBookmarks(state, getters, rootState, rootGetters) {
      if (rootGetters['users/getUsers'].length < 1) {
        return state.bookmarks;
      }
      return state.bookmarks
        .filter(
          bookmark => 
          bookmark.userName === 
          rootGetters['users/getUsers'][0].username);
    }
  },

  actions: {
    addBookmark({commit, getters}, bookmark) {
      const userBookmarks = getters.getBookmarks
        .filter(item => item.userName === bookmark.userName);
      
      if (userBookmarks.length < 1) {
        commit('addBookmarkMutation', bookmark);
        return;
      }

      const destination = userBookmarks
        .find(item => item.destinationSlug === bookmark.destinationSlug);
      
        if (!destination) {
        commit('addBookmarkMutation', bookmark);
      } else {
        const experience = destination.experiences
          .find(
            item => 
            item.experienceSlug === 
            bookmark.experiences.experienceSlug);
        if (!experience) {
          commit('updateDestination', bookmark);
        } 
      }      
    },

    removeBookmark({ commit, rootGetters }, bookmark) {
      const user = rootGetters['users/getUsers'][0];
      commit('removeBookmarkFromState', {bookmark, user});
    },
  },

  mutations: {
    addBookmarkMutation(state, bookmarkObject) {
      state.bookmarks.push(bookmarkObject);
    },

    removeBookmarkFromState(state, bookmark) {
      const userBookmarks = state.bookmarks
        .filter(item => item.userName === bookmark.user.username);
      
      const currentDestination = userBookmarks
        .find(destination =>
          destination.destinationId ===
          bookmark.bookmark.destination.destinationId);
       
      if (!currentDestination) {
        return;
      }

      currentDestination.experiences = currentDestination.experiences
        .filter(experience => 
          experience.regionId !==
          bookmark.bookmark.existingExperience.regionId);
      
      if (currentDestination.experiences.length < 1) {
        state.bookmarks = state.bookmarks
          .filter(destination =>
            destination.destinationId !==
            currentDestination.destinationId);
      }
    },

    updateDestination(state, bookmark) {
      state.bookmarks
        .filter(item => item.userName === bookmark.userName)
          .find(item => item.destinationSlug === bookmark.destinationSlug)
            .experiences.push(bookmark.experiences[0]);
    },
  }
}