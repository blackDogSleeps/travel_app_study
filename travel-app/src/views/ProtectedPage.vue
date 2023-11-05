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
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: window.user
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