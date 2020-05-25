<template>
  <div>
    <h2>UsersNewページです</h2>
    <div class="sending" v-if="sending">Sending...</div>
    <div>
      <h3>新規ユーザー作成</h3>
      <div>
        <label>名前：</label>
        <input type="text" v-model="user.name">
      </div>
      <div>
        <label>説明文：</label>
        <textarea v-model="user.description"></textarea>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <div>
        <input type="button" @click="createUser" value="送信">
      </div>
    </div>
  </div>
</template>

<script>
import { userData } from "@/userData";

export default {
  mixins: [ userData ],
  data() {
    return {
      sending: false,
      user: this.defaultUser(),
      error: null
    }
  },
  created() {
  },
  methods: {
    defaultUser() {
      return {
        name: '',
        description: ''
      }
    },
    postUser(params, callback) {
      setTimeout(() => {
        params.id = userData.length + 1;
        userData.push(params);// userDataへparamsを送る params = 定義したURLパターンにマッチした現在のパラメータをkey/valueペアで保持するオブジェクト
        callback(null, params);
      }, 1000)
    },
    createUser() {
      // 入力パラメーターのバリデーション
      if(this.user.name.trim() === '') {
        this.error = 'Nameは必須です'
        return
      }
      if(this.user.description.trim() === '') {
        this.error = 'Descriptionは必須です'
        return
      }
      this.sending = true;
      this.postUser(this.user, ((err, user) => {
        this.sending = false;
        if(err) {
          this.error = err.toString();
        } else {
          this.error = null;
          console.log(this.user = user);// {id: 3, __ob__: Observer} -> /description: "", id: 3, name: ""/
          this.user = this.defaultUser();// defaultでフォームをリセット
          alert('新規ユーザーが登録されました');
          this.$router.push('/users');// ユーザー一覧ページに戻る
        }
      }).bind(this));
    }
  }
}
</script>