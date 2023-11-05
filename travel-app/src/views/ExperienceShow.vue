<template>
  <section class="experience-details">
    <!-- {{ $route.query }} -->
    <h3>{{ experience.name }}</h3>
    <img :src="`/images/${experience.image}`">
    <p>{{ experience.description }}</p>
  </section>
</template>

<script>
import sourceData from '../data.json';


export default {
  computed: {
    experience() {
      return sourceData.destinations
        .find((destination) => 
          destination.slug == this.$route.params.destinationSlug)
            .experiences
              .find((experience) => 
                experience.slug == this.$route.params.experienceSlug
              );
    }
  },
}

</script>

<style>
.experience-details {
  padding: 40px 0;
}
</style>