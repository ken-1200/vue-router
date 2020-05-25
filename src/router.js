import Vue from 'vue';
import Router from 'vue-router';
import { Auth } from '@/auth';

const Top = () => import(/* webpackChunkName: "Top" */"./views/Top.vue");
const Users = () => import(/* webpackChunkName: "Users" */"./views/Users.vue");
const UserDetail = () => import(/* webpackChunkName: "UserDetail" */"./views/UserDetail.vue");
const UserCreate = () => import(/* webpackChunkName: "UserCreate" */"./views/UserCreate.vue");
const Login = () => import(/* webpackChunkName: "Login" */"./views/Login.vue");

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/top',
      component: Top
    },
    {
      path: '/users',
      component: Users
    },
    {
      path: '/users/new',
      component: UserCreate,
      beforeEnter(to, from, next) {
        // 認証されていない状態でアクセスした時はloginページに遷移する
        if (!Auth.loggedIn()) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          });
        } else {
          // 認証済みであればそのまま新規ユーザー作成ページへ進む
          next();
        }
      }
    },
    {
      path: '/users/:userId',
      component: UserDetail
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/logout',
      beforeEnter (to, from, next) {
        Auth.logout()
        next('/top')
      }
    },
    {
      // 定義されていないパスへの対応。トップページへリダイレクトする。
      path: '*',
      redirect: '/top'
    },
  ]
});