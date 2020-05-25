<template>
  <div>
    <h2>Usersページです</h2>
    <div class="loading" v-if="loading">読み込み中...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <!-- usersがロードされたら各ユーザーの名前を表示する -->
    <ul v-for="user in users" :key="user.id">
      <li>
        <router-link :to="{ path: '/users/' + user.id }">{{ user.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { userData } from "@/userData";

export default {
  mixins: [ userData ],
  data() {
    return {
      loading: false,
      users: () => { return [] },
      error: null,
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    getUsers(callback) {
      setTimeout(() => {
        callback(null, userData);
      }, 1000)
    },
    fetchData() {
      this.loading = true;
      this.getUsers(((err, users) => {
        this.loading = false;
        if(err) {
          this.error = err.toString();
        } else {
          console.log(this.users = users);
        }
      }).bind(this));
    }
  }
}
</script>

<style scoped>
  a {
    padding: 0;
  }
</style>