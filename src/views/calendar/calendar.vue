<template>
  <div class="container-box">
    <div class="container-left">
      <app-dialog-new-todo></app-dialog-new-todo>
      <app-datepicker
        v-model="date"
        :first-day-of-week="firstDayOfWeek"
        :displaySec="false"
        :displayHeader="false"
        :freeDays="freeDays"
        :todosDays="todoDays"
        @newData="setDataFromPicker"
      />
      <v-select :items="selectItems" v-model="calendarMode" solo dense />
    </div>
    <app-calendar-month
      v-if="calendarMode"
      :monthData="monthData"
      :daysOfWeek="daysOfWeek"
    />
    <app-calendar-week v-else :weekData="week" :daysOfWeek="daysOfWeek" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

import datepicker from "../../components/datepicker/index.vue";
import calendarMonth from "./calendar-month.vue";
import calendarWeek from "./calendar-week.vue";

import { dayData, Holiday } from "./types";
import { ActionMutationType } from "../../store/types";
import { Todo } from "../../store/modules/todo/types";
import dialogNewTodo from "../todos/todo-table/todo-dialog.vue";

@Component({
  components: {
    appDatepicker: datepicker,
    appCalendarMonth: calendarMonth,
    appCalendarWeek: calendarWeek,
    appDialogNewTodo: dialogNewTodo,
  },
})
export default class AppCalendar extends Vue {
  date = new Date();
  monthData: dayData[][] = [];
  firstDayOfWeek = "1";
  selectItems = [
    { text: "month", value: true },
    { text: "week", value: false },
  ];
  calendarMode = true;
  daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  get week() {
    return (
      this.monthData.find((item) => {
        return item.some((day) => {
          return day.chosen;
        });
      }) || this.monthData[0]
    );
  }

  @Getter("freeDays") freeDays!: Holiday[];
  @Getter("todoDays") todoDays!: Todo[][];

  @Action("getfreeDays") getfreeDays!: ActionMutationType;
  @Action("getTodoDays") getTodoDays!: ActionMutationType<{
    year: number;
    month: number;
  }>;

  setDataFromPicker(data: dayData[][]) {
    this.monthData = data;
  }

  @Watch("monthData") function(newData: dayData[][], oldData: dayData[][]) {
    if (
      oldData.length === 0 ||
      newData[1][0].date.month !== oldData[1][0].date.month
    ) {
      this.getTodoDays({
        year: newData[1][0].date.year,
        month: newData[1][0].date.month,
      });
    }
  }

  created() {
    this.getfreeDays();
  }
}
</script>

<style lang="scss">
.container-box {
  display: flex;
  height: 100%;
  .container-left {
    border-right: 0.5px solid rgb(165, 163, 163);
  }
  .container-center {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    .day-calendar {
      border-left: 0.5px solid rgb(165, 163, 163);
      margin: 2em 0 0 3em;
      .row-day {
        position: relative;
        width: 100%;
        height: 5vh;
        .time {
          position: absolute;
          font-size: 10px;
          top: -0.8em;
          left: -3em;
        }
      }
    }
    .row-calendar {
      display: flex;
      height: 100%;
      justify-content: space-between;
      .col-calendar {
        width: 100%;
        position: relative;
        border-bottom: 0.5px solid rgb(165, 163, 163);
        border-right: 0.5px solid rgb(165, 163, 163);
        flex: 1;
        display: flex;
        flex-direction: column;
        background-color: transparent;
        z-index: 2;
        cursor: pointer;
        .day-event {
          margin: 1px;
          border-radius: 5px;
          font-size: 0.7em;
          padding: 0 5px 5px 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .event-todo-day {
          background-color: rgb(179, 225, 247);
          color: rgb(112, 103, 103);
        }
        .event-todo-more {
          color: rgb(112, 103, 103);
          transition: 0.6s background-color;
        }
        .event-todo-more:hover {
          background-color: rgb(231, 236, 238);
        }
        .day-title {
          position: relative;
          top: -1.5em;
          padding-left: 5%;
          width: 100%;
          cursor: pointer;
          .day-name {
            color: #70757a;
            font-size: 11px;
          }
          .day-number {
            color: #70757a;
            font-size: 26px;
          }
        }
        .outMonth {
          color: rgb(187, 186, 186);
        }
      }
    }
  }
}
</style>
