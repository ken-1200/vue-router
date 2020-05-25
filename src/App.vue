<template>
  <div id="app">
    <div id="container">
      <h1>Vue-Router練習 SampleSPA</h1>
      <nav>
        <router-link to="/top">TopPage</router-link>
        <router-link to="/users">UsersPage</router-link>
        <router-link to="/users/new?redirect=true">UsersNew</router-link>
        <router-link to="/login" v-show="!Auth.loggedIn()">Login</router-link>
        <router-link to="/logout" v-show="Auth.loggedIn()">Logout</router-link>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { Auth } from '@/auth';

export default {
  data() {
    return {
      Auth
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#container {
  background-color: #d7dee6;
}

h2 {
  background-color: #f5f8fa;
  text-shadow: 2px 2px 8px rgb(27, 84, 65);
  padding: 10px;
  margin: 0 auto;
  max-width: 80%;
}

ul {
  list-style: none;
  padding: 0;
}

a {
  text-align: center;
  color: #42502c;
  padding-left: 10px;
}
</style>
