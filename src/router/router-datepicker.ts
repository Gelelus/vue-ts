export default {
    path: "/datepicker",
    name: "datepicker",
    component: () =>
      import(/* webpackChunkName: "test" */ "../views/test/test.vue")
  };
  