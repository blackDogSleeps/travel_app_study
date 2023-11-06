<template>
  <div>
    <h1>Hello there {{ username }} </h1>
    <button
      @click="logOut()"
      class="btn">
      Logout
    </button>
    <router-link :to="{ name: 'invoices' }">
      <button  class="btn">Invoices</button>
    </router-link>
    <router-link :to="{ name: 'hidden' }">
      <button class="btn">Hidden Page</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem('username'),
    }
  },

  methods: {
    logOut() {
      // window.user = undefined;
      localStorage.removeItem('username')
      this.$router.push({ name: 'home' });
    },
  }
}
</script>

<style lang="css">
.btn {
  margin-right: 10px;
}
</style>