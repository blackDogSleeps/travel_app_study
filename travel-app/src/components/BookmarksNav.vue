<template>
  <div
    v-if="bookmarksLength"
    class="bookmarks-box"  
  >
    Bookmarked: {{ bookmarksLength }}
  </div>
</template>


<script>
// import users from '@/store/modules/users';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      users: 'users/getUsers',
    }),

    ...mapGetters({
      bookmarks: 'bookmarks/getBookmarks',
    }),

    // ...mapState({
    //   bookmarks: state => state.bookmarks.bookmarks
    //     .filter(bookmark => bookmark.userName === users[0].username)
    //       .map(item => item.experiences.length),
    // }),

    bookmarksLength() {
      if (this.users.length < 1) {
        return;
      }
      if (this.bookmarks.length > 0) {
        console.log(this.bookmarks);
        return this.bookmarks
          .map(item => item.experiences.length)
            .reduce((a, b) => a + b);  
      }
      return null;
    }
  }
}

</script>


<style lang=css scoped>
.bookmarks-box {
  color: #fff;
  background-color: #6487ab;
  text-align: center;
  border-radius: 5px;
  padding: 10px 25px;
  opacity: 1;

}

</style>