<template>
  <section class="experience-details">
    <h3>{{ experience.name }}</h3>
    <img :src="`/images/${experience.image}`">
    <p>{{ experience.description }}</p>

  </section>
</template>

<script>
import sourceData from '../data.json';


export default {
  props: {
    id: {
      type: Number,
      required: true,
    }
  },

  computed: {
    experience() {
      return sourceData.destinations
        .find((destination) => destination.id == this.id)
          .experiences
            .find(
              (experience) => 
                experience.slug == this.$route.params.experienceSlug
            );
    }
  },
}

</script>