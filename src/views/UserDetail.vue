<template>
  <div>
    <h2>UsersDetailページです</h2>
    <div class="loading" v-if="loading">読み込み中...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="user">
      <h3>{{ user.name }}</h3>
      <p>{{ user.description }}</p>
    </div>
  </div>
</template>

<script>
import { userData } from "@/userData";

export default {
  mixins: [ userData ],
  data() {
    return {
      loading: false,
      user: null,
      error: null
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    getUser(userId, callback) {
      setTimeout(() => {
        const filteredUsers = userData.filter((user) => {
        return user.id === parseInt(userId, 10)
        });
        callback(null, filteredUsers && filteredUsers[0]);
      }, 1000);
    },
    fetchData() {
      this.loading = true;
      this.getUser(this.$route.params.userId, ((err, user) => {
        this.loading = false;
        if(err) {
          this.error = err.toString();
        } else {
          this.user = user;
        }
      }).bind(this));
    }
  }
}
</script>