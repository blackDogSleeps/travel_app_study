import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // { destinationSlug: String,
    //   experienceSlug: String }
    bookmarks: [],
    bookmarksLength: 0,
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
          destinationSlug: bookmark.destinationSlug,
          experiences: [{
            experienceSlug: bookmark.experienceSlug, 
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
    }
  },

  mutations: {
    addBookmarkMutation(state, bookmarkObject) {
      state.bookmarksLength++,
      state.bookmarks.push(bookmarkObject);
    },

    updateDestination(state, bookmark) {
      state.bookmarksLength++;
      console.log(state.bookmarksLength);
      state.bookmarks
        .find(item => item.destinationSlug === bookmark.destinationSlug)
          .experiences.push({ experienceSlug: bookmark.experienceSlug });
    },
  }
})