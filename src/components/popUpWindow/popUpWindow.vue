<template>
  <div @click.stop class="popup-window" :style="{ opacity, left, top, zIndex }">
    <button class="btn-close" @click="close">X</button>
    <div v-if="mode === 'todos'">
      <div class="todo-name">Name: {{ data.name }}</div>
      <div class="todo-name">Time: {{ data.generalDate.slice(11, 16) }}</div>
      <div class="action-buttons">
        <button class="btn-detail" @click="detail">Detail information</button>
      </div>
    </div>
    <div v-if="mode === 'holiday'">
      <div class="name-holiday">{{ data.holiday.name }}</div>
    </div>
    <div v-if="mode === 'todosList'">
      <div
        v-for="(todo, i) in data"
        :key="i"
        class="todo-list"
        @click="setTodo(todo)"
      >
        {{ todo.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Todo } from "../../store/modules/todo/types";
import { Holiday } from "../../views/calendar/types";

@Component({})
export default class AppPopUpWindow extends Vue {
  top = 0;
  opacity = 0;
  left = 0;
  mode = "";
  data: Todo | Holiday | Todo[] = [];
  zIndex = -100;
  close() {
    this.opacity = 0;
    this.zIndex = -100;
  }
  detail() {
    this.$router.push({
      name: "TodoDetail",
      params: { id: (this.data as Todo)._id },
    });
  }
  setTodo(todo: Todo) {
    this.mode = "todos";
    this.data = todo;
  }
  created() {
    document.onclick = () => {
      if (this.opacity) {
        this.close();
      }
    };
  }
}
</script>

<style lang="scss">
.popup-window {
  transition: 0.6s opacity;
  border-radius: 10px;
  width: 18em;
  min-height: 5em;
  position: absolute;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 1em;
  text-align: left;
  .todo-list {
    margin: 1px;
    border-radius: 5px;
    font-size: 0.7em;
    padding: 0 5px 5px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: rgb(179, 225, 247);
    color: rgb(112, 103, 103);
  }
  .btn-close {
    color: rgb(105, 8, 8);
    display: block;
    position: absolute;
    top: 0;
    left: 20.5em;
    padding-right: 0.5em;
    padding-left: 0.5em;
    font-size: 0.8em;
  }
  .todo-name {
    text-align: center;
  }
  .action-buttons {
    display: flex;
    justify-content: center;
    margin-top: 1em;
  }
  .btn-detail {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    padding: 0.1em;
    width: 48%;
    float: center;
    font-size: 0.8em;
    border-radius: 1em;
    transition: background-color 0.6s;
  }
  .btn-detail:hover {
    background-color: rgb(199, 197, 197);
  }
  .name-holiday {
    color: rgb(105, 8, 8);
    text-align: center;
  }
}
</style>
