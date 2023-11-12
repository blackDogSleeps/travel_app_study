<template>
  <div  id="nav">
    <router-link id="logo" to="/">Travel Until You Wish<br>You'd Stayed At Home</router-link>
    <router-link
      v-for="destination in destinations"
      :key="destination.id"
      :to="{
        name: 'destination.show',
        params: { destinationSlug: destination.slug },
      }"
    >
      {{ destination.name }}
    </router-link>
    <router-link :to="{ name: 'protected' }">
      Dashboard
    </router-link>
    <router-link
      class="bookmarks-btn"
      :to="{ name: 'bookmarks' }">
      <bookmarks-nav />
    </router-link>
  </div>
</template>

<script>
import BookmarksNav from './BookmarksNav';
import sourceData from '../data.json';

export default {
  data() {
    return {
      destinations: sourceData.destinations,
    }
  },

  components: {
    BookmarksNav,
  }
}
</script>

<style lang="css" scoped>
.bookmarks-btn {
  opacity: 1 !important;
}

.bookmarks-btn:hover {
  opacity: 0.7 !important;
}

</style>