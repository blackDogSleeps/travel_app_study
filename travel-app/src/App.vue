<template>
  <div id="app">
    <div class="container">
      <the-navigation />
      <template>
        <transition name="fade" mode="out-in">
          <router-view
            :key="getKey"/>
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

  computed: {
    getKey() {
      return this.$route.params[
        this.$route.meta.viewKey
      ];
    },
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