<template>
  <v-data-table :headers="headers" :items="filtredTodos" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Todo list</v-toolbar-title>
        <v-divider class="mx-4" inset vertical />
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="newItem()"
          >New Todo</v-btn
        >
        <app-dialog />
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small class="mr-2" @click="deleteItem(item)" v-if="item.todoType"
        >mdi-delete</v-icon
      >
      <v-icon small class="mr-2" @click="checked(item)">mdi-notebook</v-icon>
    </template>
    <template v-slot:item.type="{ item }">
      <v-label>{{ item.todoType || "OnceDay" }}</v-label>
    </template>
    <template v-slot:item.name="{ item }">
      <router-link :to="item._id" append>{{ item.name }}</router-link>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action, Mutation } from "vuex-class";

import { Todo } from "../../../store/modules/todo/types";
import TodoDialog from "./todo-dialog.vue";
import { ActionMutationType } from "../../../store/types";

@Component({
  components: {
    appDialog: TodoDialog,
  },
})
export default class AppTodoTable extends Vue {
  headers = [
    { text: "Type", value: "type", sortable: false },
    {
      text: "Names",
      align: "start",
      sortable: false,
      value: "name",
    },

    { text: "Actions", value: "actions", sortable: false },
  ];

  get filtredTodos() {
    return this.todos.filter((a) => {
      if (a.todoChecked) {
        return this.today === new Date(a.todoChecked).getDate() ? false : true;
      } else {
        return true;
      }
    });
  }
  get today() {
    return new Date().getDate();
  }
  @Getter("todos") todos!: Todo[];

  @Action("deleteTodo") deleteTodo!: ActionMutationType<string>;
  @Action("editTodo") editTodo!: ActionMutationType<Todo>;
  @Action("getTodoList") getTodoList!: ActionMutationType<string>;

  @Mutation("editMode") editMode!: ActionMutationType<Todo>;
  @Mutation("showDialog") showDialog!: ActionMutationType;

  editItem(item: Todo) {
    this.editMode(item);
  }
  newItem() {
    this.showDialog();
  }
  deleteItem(item: Todo) {
    this.deleteTodo(item._id);
  }
  checked(item: Todo) {
    if (!item.todoType) {
      this.deleteTodo(item._id);
    } else {
      this.editTodo({ ...item, todoChecked: new Date() });
    }
  }

  created() {
    this.getTodoList();
  }
}
</script>

<style lang="scss">
a {
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;
}
</style>
