<template>
  <div class="container-center">
    <app-popup-window ref="popupWindow"></app-popup-window>
    <div class="row-calendar" v-for="(week, i) in monthData" :key="i">
      <div
        class="col-calendar"
        v-for="(dayData, j) in week"
        :key="j"
        @click="newTodo(dayData)"
      >
        <span
          v-if="dayData.holiday"
          v-popupWindow:holiday="dayData"
          class="holiday-container"
        >
        </span>
        <div v-if="i === 0">{{ daysOfWeek[j] }}</div>
        <div :class="{ outMonth: dayData.out, holidayDay: dayData.holiday }">
          {{ dayData.day }}
        </div>
        <div
          class="day-event event-todo-day"
          v-for="(day, i) in dayData.todos ? dayData.todos.slice(0, 3) : []"
          v-popupWindow:todos="day"
          :key="i"
        >
          {{ day.name.slice(0, 4) + "..." }}
        </div>
        <div
          class="day-event event-todo-more"
          v-if="dayData.todos && dayData.todos.length > 3"
          v-popupWindow:todosList="dayData.todos"
        >
          {{ "еще " + (dayData.todos.length - 3) }}
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
import { ActionMutationType } from "../../store/types";

@Component({
  components: {
    appPopupWindow: popupWindow,
  },
})
export default class AppCalendarMonth extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly monthData!: dayData[][];
  @Prop({
    type: Array,
    default: () => ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  })
  readonly daysOfWeek!: string[];

  @Mutation("openDialogWithDate") openDialogWithDate!: ActionMutationType<Date>;

  newTodo(dayData: dayData) {
    const date = new Date(
      dayData.date.year,
      dayData.date.month,
      dayData.day
    );
    this.openDialogWithDate(date)
  }
}
</script>

<style>
.event-todo-day a {
  color: white;
}
.holidayDay {
  color: rgb(119, 4, 4);
  z-index: -2;
}
.holiday-container {
  position: absolute;
  height: calc(100%);
  width: calc(100%);
  background-color: rgb(245, 199, 199);
  opacity: 0.5;
  z-index: -1;
  cursor: pointer;
}
</style>
