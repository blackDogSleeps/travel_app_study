<template>
  <div id="app">
    <div class="container">
      <the-navigation />
      <router-view :key="$route.path"/>
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