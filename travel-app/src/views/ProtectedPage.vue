<template>
  <div>
    <h1>Hello there {{ username }} </h1>
    <router-link :to="{ name: 'bookmarks' }">
      <button class="btn">Bookmarks</button>
    </router-link>
    <router-link :to="{ name: 'invoices' }">
      <button class="btn">Invoices</button>
    </router-link>
    <router-link :to="{ name: 'hidden' }">
      <button class="btn">Hidden Page</button>
    </router-link>
    <button
      @click="logOut()"
      class="btn">
      Logout
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: localStorage.getItem('username'),
    }
  },

  methods: {
    ...mapActions({
      removeUser: 'users/removeUser',
    }),

    logOut() {
      const userToRemove = localStorage.getItem('username');
      this.removeUser(userToRemove);
      localStorage.removeItem('username');
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