<template>
  <div
    class="card">
    <img :src="`/images/${experience.image}`">
    <div class="card__text">{{ experience.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    experience: Object,
  },
}


</script>