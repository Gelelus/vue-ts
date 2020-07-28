export default {
    path: "/auth",
    name: "Auth",
    component: () =>
      import(/* webpackChunkName: "auth" */ "../views/auth/auth-index.vue")
  };
  