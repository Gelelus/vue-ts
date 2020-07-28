<template>
  <v-card width="500" class="mx-auto mt-5">
    <v-card-title>Detail Todo</v-card-title>
    <v-card-text>
      <v-text-field
        :value="detailTodo.todoType || 'Common'"
        label="Todo Type"
        readonly
      ></v-text-field>
      <v-text-field v-model="detailTodo.name" label="Todo name"></v-text-field>
      <v-textarea
        v-model="detailTodo.description"
        label="Todo description"
      ></v-textarea>
      <v-text-field :value="todoDate" label="Todo Date" readonly></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="save">
        Save Changes
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="deleteItem">delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

import { Todo } from "../../../store/modules/todo/types";
import { ActionMutationType } from "../../../store/types"

@Component({})
export default class AppDetail extends Vue {
  weekDays = [
    "каждое воскресенье",
    "каждый понедельник",
    "каждый вторник",
    "каждую среду",
    "каждый четверг",
    "каждую пятницу",
    "каждую субботу",
  ];

  get todoDate() {
    if (this.detailTodo.generalDate) {
      const date = new Date(this.detailTodo.generalDate);
      const todo = this.detailTodo;
      const time = date.toString().slice(16, 21);
      if (todo.todoType === "EveryDay") {
        return "каждый день в " + time;
      } else if (todo.todoType === "EveryWeek") {
        return this.weekDays[date.getDay()] + " в " + time;
      } else if (todo.todoType === "EveryMonth") {
        return "каждое " + date.getDate() + " число в " + time;
      }
      return date.toISOString().slice(0, 10) + " " + time;
    }
    return "";
  }
  @Getter("detailTodo") detailTodo!: Todo;

  @Action("getDetailTodo") getDetailTodo!: ActionMutationType<string>;
  @Action("deleteTodo") deleteTodo!: ActionMutationType<string> ;
  @Action("editTodo") editTodo!: ActionMutationType<Todo> ;

  save() {
    this.editTodo({ ...this.detailTodo });
    this.$router.go(-1);
    // this.$router.push({ name: "Todos" });
  }

  deleteItem() {
    this.deleteTodo(this.detailTodo._id);
    this.$router.go(-1);
    // this.$router.push({ name: "Todos" });
  }

  created() {
    this.getDetailTodo(this.$route.params.id);
  }
}
</script>
