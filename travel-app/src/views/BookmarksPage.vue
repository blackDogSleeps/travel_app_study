<template>
  <div>
    <h1>Bookmarks</h1>
    <section
      v-for="bookmark in bookmarks"
      :key="bookmark.id"
      class="experience-details">
      <div class="experience-header">
        <h3>{{ bookmark }}</h3>
        <p>{{ bookmark.experiences }}</p>
      </div>
      <!-- <img :src="`/images/${experience.image}`"> -->
    </section>
  </div>
</template>

<script>
import sourceData from '../data.json';

export default {
  data() {
    return {
      dest: sourceData.destinations,
    }
  },

  computed: {
    bookmarks() {
      return this.$store.getters.getBookmarks;
    },
  },


  methods: {
    destination(bookmark) {
      const destination = this.dest
        .find(item => item.slug === bookmark.destinationSlug);
      return destination;
        // const experience = destination.experiences
      //   .find(item => item.slug === bookmark.experienceSlug);
      // return { destination, experience }
    },
  },
}

</script>