<template>
  <div id="app">
    <div class="container">
      <the-navigation />
      <transition name="slide" mode="out-in">
        <router-view :key="$route.path"/>
      </transition>
    </div>
  </div>
</template>


<script>
import TheNavigation from './components/TheNavigation.vue';

export default {
  components: {
    TheNavigation,
  }
}
</script>

<style lang="css">
  .slide-enter-active,
  .slide-leave-active {
    transition: opacity 1s, transform 1s;
  }
  
  .slide-enter,
  .slide-leave-to {
    opacity: 0;
    transform: translateX(-30%);
  }

</style>