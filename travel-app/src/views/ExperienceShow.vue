<template>
  <section class="experience-details">
    <div class="experience-header">
      <h3>{{ experience.name }}</h3>
      <span
         class="btn-container">
        <button
          v-if="!isBookmarked(experience)"
          @click="addBookmark(experience)"
          class="btn">
          Bookmark
        </button>
        <button
          class="btn btn-disabled"
          disabled=true 
          v-else
        >Bookmarked</button>

      </span>
    </div>
    <img :src="`/images/${experience.image}`">
    <p>{{ experience.description }}</p>
  </section>
</template>

<script>
import sourceData from '../data.json';


export default {
  data() {
    return {
      user: localStorage.username,
    }
  },

  props: {
    destination: Object,
  },


  computed: {
    experience() {
      return sourceData.destinations
        .find((destination) => 
          destination.slug == this.$route.params.destinationSlug)
            .experiences
              .find((experience) => 
                experience.slug == this.$route.params.experienceSlug
              );
    },
  },

  methods: {
    addBookmark(experience) {
      if (!localStorage.getItem('username')) {
        this.$router.push(
          { name: 'login',
            query: { redirect: this.$route.fullPath }
        });
        return;
      }
      let bookmark = {
        destinationSlug: this.destination.slug,
        destinationName: this.destination.name,
        experienceSlug: experience.slug,
        experienceName: experience.name,
        experienceImage: experience.image,
        experiencePath: this.$route.fullPath,
      }

      this.$store.dispatch(
        'addBookmark', bookmark);
    },

    isBookmarked(experience) {
      const viewKey = this.$route.params[this.$route.meta.viewKey];
      const direction = this.$store.getters
        .getBookmarks.find(item => item.destinationSlug === viewKey);
      if (!direction) {
        return null;
      }
      return direction.experiences
        .find(item => item.experienceSlug === experience.slug);
    }
  },
}

</script>

<style scoped>
.experience-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.btn {
  margin-left: 5px;
  margin-right: 5px; 
}

.experience-details {
  padding: 40px 0;
}
</style>