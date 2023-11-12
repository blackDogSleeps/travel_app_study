<template>
  <div
    v-if="bookmarksLength > 0"
    class="bookmarks-box"  
  >
    Bookmarked: {{ bookmarksLength }}
  </div>
</template>


<script>

export default {
  computed: {
    bookmarksLength() {
      return this.$store.state.bookmarksLength;
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

/* .bookmark-count {
  transform: translateY(33%);
} */

</style>