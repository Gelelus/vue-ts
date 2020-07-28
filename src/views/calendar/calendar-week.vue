<template>
  <div class="container-center">
    <app-popup-window ref="popupWindow"></app-popup-window>
    <div class="day-calendar">
      <div class="row-calendar row-day">
        <div class="col-calendar" v-for="(day, i) in fitredWeekData" :key="i">
          <span
            v-if="day.holiday"
            v-popupWindow:holiday="day"
            class="holiday-container-week"
          >
          </span>
          <div class="day-title">
            <span class="day-name">{{ daysOfWeek[i] }}</span>
            <br />
            <span
              class="day-number"
              :style="{ color: day.holiday ? 'rgb(131, 1, 1)' : 'black' }"
              >{{ day.day }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="row-calendar row-day"
        v-for="time in fitredTimeData"
        :key="time"
      >
        <span class="time">{{ time - 1 + ":" + "00" }}</span>
        <div
          class="col-calendar"
          v-for="(dayData, index) in fitredWeekData"
          @click="newTodo(dayData, time - 1)"
          :key="index"
        >
          <!-- поискать возможности переписать   -->
          <div
            class="day-event event-todo-day"
            v-if="filter(dayData.todos, time).length"
            v-popupWindow:todosList="filter(dayData.todos, time)"
          >
            {{ filter(dayData.todos, time).length + " todos" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import popupWindow from "../../components/popUpWindow/popUpWindow.vue";

import { dayData } from "./types";
import { Todo } from "./../../store/modules/todo/types";
import { ActionMutationType } from "../../store/types";

@Component({
  components: {
    appPopupWindow: popupWindow,
  },
})
export default class AppCalendarMonth extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly weekData!: dayData[];
  @Prop({
    type: Array,
    default: () => ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  })
  readonly daysOfWeek!: string[];

  get fitredWeekData() {
    const arr = this.weekData.filter((a) => {
      return a.month === 0;
    });
    if (arr.length === 0) {
      return this.weekData;
    }

    return arr;
  }

  get fitredTimeData() {
    let num = 0;
    this.weekData.forEach((a) => {
      if (a.todos) {
        a.todos.forEach((todo) => {
          if (num < +todo.generalDate.slice(11, 13)) {
            num = +todo.generalDate.slice(11, 13);
          }
        });
      }
    });
    return num + 1;
  }

  @Mutation("openDialogWithDate") openDialogWithDate!: ActionMutationType<Date>;

  filter(todos: Todo[], time: number) {
    if (!todos) {
      return [];
    }
    return todos.filter((todo) => {
      return +todo.generalDate.slice(11, 13) === time - 1;
    });
  }
  newTodo(dayData: dayData, time: number) {
    const date = new Date(
      dayData.date.year,
      dayData.date.month,
      dayData.day,
      time
    );
    this.openDialogWithDate(date);
  }
}
</script>

<style>
.holiday-container-week {
  position: absolute;
  height: calc(100%);
  width: calc(100%);
  background-color: rgb(245, 199, 199);
  opacity: 0.5;
  z-index: 10;
  cursor: pointer;
}
</style>
