<template>
  <div id="app">
    <div class="container">
      <the-navigation />
      <template>
        <transition name="fade" mode="out-in">
          <router-view
            :key="this.$route.params.destinationSlug"/>
        </transition>
      </template>
    </div>
  </div>
</template>


<script>
import TheNavigation from './components/TheNavigation.vue';

export default {
  components: {
    TheNavigation,
  },
}
</script>

<style lang="css">
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