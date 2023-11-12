<template>
  <div>
    <h1>Bookmarks</h1>
    <section
      v-for="bookmark in bookmarks"
      :key="bookmark.slug">
        <h3>{{ bookmark.destinationName }}</h3>
        <div class="bookmarks-section">
          <div
            v-for="experience in bookmark.experiences"
            :key="experience.id">
            <router-link :to="experience.experiencePath">
            <p>
              {{ experience.experienceName }}
            </p>
              <img
              style="width: 200px; margin: 0;" 
              :src="`/images/${experience.experienceImage}`">
            </router-link>
          </div>
        </div>
        <div class="blank-space"></div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    bookmarks() {
      return this.$store.getters.getBookmarks;
    },
  },
}

</script>

<style lang="css" scoped>
.bookmarks-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  column-gap: 30px;
}

h3 {
  margin-bottom: 0;
}

.blank-space {
  position: relative;
  height: 30px;
}
</style>