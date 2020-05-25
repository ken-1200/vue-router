<template>
  <div>
    <h2>Loginページです</h2>
    <p v-if="$route.query.redirect">ログインしてください</p>
    <form @submit.prevent='login'>
      <label><input v-model="email" placeholder="email"></label>
      <label><input v-model="pass" placeholder="password" type="password"></label>
      <br><br>
      <button type="submit">ログイン</button>
      <p v-if="error" class="error">ログインに失敗しました</p>
    </form>
  </div>
</template>

<script>
import { Auth } from '@/auth';

export default {
  mixins: [ Auth ],
  data() {
    return {
      email: 'vue@example.com',
      pass: '',
      error: false
    }
  },
  methods: {
    login() {
      Auth.login(this.email, this.pass, ((loggedIn) => {
        if(!loggedIn) {
          this.error = true;
        } else {
          console.log(this.$router.replace(this.$route.query.redirect || '/'));
        }
      }).bind(this));
    }
  }
}
</script>