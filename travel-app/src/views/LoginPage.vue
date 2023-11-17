<template>
  <div class="login">
    <form class="form" @submit.prevent="login">
      <h1>Login</h1>
      <label for="username">Username</label>
      <input v-model="username" name="username" type="text" class="input">
      <label for="password">Password</label>
      <input v-model="password" name="password" type="text" class="input">
      <button class="btn">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },

  methods: {
    ...mapActions({
      addUser: 'users/addUser',
    }),

    login() {
      // window.user = this.username;
      localStorage.setItem('username', this.username);
      this.addUser(this.username);
      const redirectPath = this.$route.query.redirect || '/';
      this.$router.push(redirectPath);
    }
  }
}


</script>