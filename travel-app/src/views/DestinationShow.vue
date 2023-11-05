<template>
  <div>
    <section v-if="destination" class="destination">
      <h1>{{ destination.name }}</h1>
      <div class="destination-details">
        <img 
          :src="`/images/${destination.image}`"
          :alt="destination.name"
        >
        <p>{{ destination.description }}</p>
      </div>
    </section>
    <section class="experiences">
      <h2>Top Experiences in {{ destination.name }}</h2>
      <div class="cards" id="experience">
        <router-link
          v-for="experience in destination.experiences"
          :key="experience.slug"
          :to="{ name: 'experience.show',
                 params: { experienceSlug: experience.slug},
                 hash: '#experience' }"
        >
          <experience-card
            :experience="experience" 
          />
        </router-link>
      </div>
      <transition name="fade" mode="out-in">
        <router-view :key="$route.path"/>
      </transition>
    </section>
  </div>
</template>

<script>
import sourceData from '../data.json';
import ExperienceCard from '../components/ExperienceCard.vue';


export default {
  components: {
    ExperienceCard,
  },
  
  // methods: {
  //   async initData() {
  //     const response = await fetch(`https://travel-dummy-api.netlify.app/${this.$route.params.slug}`);
  //     this.destination = await response.json();
  //   },
  // },

  computed: {
    destination() {
      return sourceData.destinations
        .find((destination) =>
          destination.slug === this.$route.params.destinationSlug);
    },
  },
  // async created() {
  //   this.initData();
  // },
}
  
</script>

<style lang="css">
.experiences {
  padding: 40px 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
  
.fade-enter,
.fade-leave-to {
  opacity: 0;
  /* transform: translateX(-30%); */
}
</style>