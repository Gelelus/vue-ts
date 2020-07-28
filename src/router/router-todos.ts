export default {
    path: "/todos",
    component: () =>
      import(/* webpackChunkName: "todos" */ "../views/todos/todo-index.vue"),
    children: [
      {
        path: "/",
        name: "Todos",
        component: () =>
          import(
            /* webpackChunkName: "todos" */ "../views/todos/todo-table/todo-table.vue"
          )
      },
      {
        path: ":id",
        name: "TodoDetail",
        component: () =>
          import(
            /* webpackChunkName: "todos" */ "../views/todos/todo-detail/todo-detail.vue"
          )
      }
    ]
  };
  