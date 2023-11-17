export default {
  namespaced: true,

  state: {
    bookmarks: [],
  },

  getters: {
    getBookmarks(state) {
      return state.bookmarks;
    }
  },

  actions: {
    addBookmark({commit, getters}, bookmark) {
      const destination = getters.getBookmarks
        .find(item => item.destinationSlug === bookmark.destinationSlug);
      
        if (!destination) {
        const bookmarkObject = {
          destinationId: bookmark.destinationId,
          destinationSlug: bookmark.destinationSlug,
          destinationName: bookmark.destinationName,
          experiences: [{
            regionId: bookmark.regionId,
            experienceSlug: bookmark.experienceSlug,
            experienceName: bookmark.experienceName,
            experienceImage: bookmark.experienceImage,
            experiencePath: bookmark.experiencePath,
            experienceDescription: bookmark.experienceDescription,
          }]
        };
        commit('addBookmarkMutation', bookmarkObject);
      } else {
        const experience = destination.experiences
          .find(item => item.experienceSlug === bookmark.experienceSlug);
        if (!experience) {
          commit('updateDestination', bookmark);
        } 
      }      
    },

    removeBookmark({ commit }, bookmark) {
      commit('removeBookmarkFromState', bookmark);
    },
  },

  mutations: {
    addBookmarkMutation(state, bookmarkObject) {
      state.bookmarks.push(bookmarkObject);
    },

    removeBookmarkFromState(state, bookmark) {
      const currentDestination = state.bookmarks
        .find(destination =>
          destination.destinationId ===
          bookmark.destination.destinationId);
      
      if (!currentDestination) {
        return;
      }

      currentDestination.experiences = currentDestination.experiences
        .filter(experience => 
          experience.regionId !==
          bookmark.existingExperience.regionId);
      
      if (currentDestination.experiences.length < 1) {
        state.bookmarks = state.bookmarks
          .filter(destination =>
            destination.destinationId !==
            currentDestination.destinationId);
      }
    },

    updateDestination(state, bookmark) {
      state.bookmarks
        .find(item => item.destinationSlug === bookmark.destinationSlug)
          .experiences.push(
            { regionId: bookmark.regionId,
              experienceSlug: bookmark.experienceSlug, 
              experienceName: bookmark.experienceName,
              experienceImage: bookmark.experienceImage,
              experiencePath: bookmark.experiencePath,
              experienceDescription: bookmark.experienceDescription,
            });
    },
  }
}