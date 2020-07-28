<template>
  <div class="picker-container" :style="{ width: width }">
    <div class="picker-header" v-if="displayHeader">
      <div class="picker-year" @click="setPicker('YearPicker')">
        <span>{{ dateObj.year }}</span>
      </div>
      <div class="picker-sub-container">
        <div class="picker-head">
          <span @click="setPicker('DayPicker')">{{
            monthOfYear[dateObj.month].slice(0, 3) + ", "
          }}</span
          ><span @click="setPicker('MonthPicker')"
            >{{ daysOfWeek[dateObj.dayOfWeek] + " " }}{{ dateObj.day }}</span
          >
        </div>
        <div class="picker-time" @click="setPicker(pickerClickTime)">
          {{ prittyTime }}
        </div>
      </div>
    </div>
    <div class="picker-display" :class="{ pickerBorder: pickerBorder }">
      <dayPicker
        v-if="vueMode.component === 'DayPicker'"
        @change="dateChange"
        @monthData="monthDataCahange"
        :vueMode="vueMode"
        :dateObj="dateObj"
        :daysOfWeek="daysOfWeek"
        :monthOfYear="monthOfYear"
        :firstDayOfWeek="firstDayOfWeek"
        :headerDateFormat="headerDateFormat"
        :outUpdate="outUpdate"
        :freeDays="freeDays"
        :todosDays="todosDays"
      />
      <MonthPicker
        :vueMode="vueMode"
        :dateObj="dateObj"
        :monthOfYear="monthOfYear"
        :headerDateFormat="headerDateFormat"
        :outUpdate="outUpdate"
        v-if="vueMode.component === 'MonthPicker'"
      />
      <YearPicker
        :dateObj="dateObj"
        :vueMode="vueMode"
        :outUpdate="outUpdate"
        v-if="vueMode.component === 'YearPicker'"
      />
      <TimePicker
        @change="dateChange"
        :dateObj="dateObj"
        :vueMode="vueMode"
        :displaySec="displaySec"
        v-if="vueMode.component === 'TimePicker'"
      />
    </div>
  </div>
</template>

<script>
import DayPicker from "./DayPicker";
import TimePicker from "./TimePicker";
import YearPicker from "./YearPicker";
import MonthPicker from "./MonthPicker";

export default {
  name: "date-picker",
  data: () => ({
    vueMode: { component: "DayPicker", payload: false },
    daysOfWeek: ["San", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthOfYear: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    dateObj: {
      year: null,
      month: null,
      day: null,
      dayOfWeek: null,
      h: null,
      m: null,
      s: null,
      maxDate: null,
      minDate: null
    },
    outUpdate: false,
    outValue: null
  }),
  computed: {
    pickerClickTime: function() {
      return this.vueMode.component === "TimePicker"
        ? "DayPicker"
        : "TimePicker";
    },
    prittyTime() {
      let prittyTime =
        ("0" + this.dateObj.h).slice(-2) +
        " : " +
        ("0" + this.dateObj.m).slice(-2);
      if (this.displaySec) {
        prittyTime += " : " + ("0" + this.dateObj.s).slice(-2);
      }
      return prittyTime;
    }
  },
  props: {
    value: { type: [String, Date], default: () => new Date() },
    firstDayOfWeek: { type: [String, Number], default: 0 },
    headerDateFormat: { type: String, default: null },
    maxDate: { type: [String, Date], default: null },
    minDate: { type: [String, Date], default: null },
    displaySec: { type: Boolean, default: false },
    displayHeader: { type: Boolean, default: true },
    pickerBorder: { type: Boolean, default: false },
    freeDays: { type: Array, default: () => [] },
    width: { type: String, default: "300px" },
    todosDays: { type: Array, default: () => [] }
  },
  components: {
    DayPicker: DayPicker,
    TimePicker: TimePicker,
    YearPicker: YearPicker,
    MonthPicker: MonthPicker
  },
  methods: {
    setPicker(picker) {
      this.vueMode.component = picker;
    },
    monthDataCahange(data) {
      this.$emit("newData", data);
    },
    dateChange() {
      const date = new Date(
        this.dateObj.year,
        this.dateObj.month,
        this.dateObj.day,
        this.dateObj.h,
        this.dateObj.m,
        this.dateObj.s
      );
      this.outValue = date.toString();
      this.$emit("input", date);
    },
    initilaze(startDate) {
      const dateString = startDate.toString();
      if (dateString === "Invalid Date" || dateString === this.outValue) {
        return;
      }
      this.dateObj.year = startDate.getFullYear();
      this.dateObj.month = startDate.getMonth();
      this.dateObj.day = startDate.getDate();
      this.dateObj.dayOfWeek = startDate.getDay();
      this.dateObj.h = startDate.getHours();
      this.dateObj.m = startDate.getMinutes();
      this.dateObj.s = startDate.getSeconds();
      if (this.maxDate) {
        this.dateObj.maxDate = new Date(this.maxDate);
      }
      if (this.minDate) {
        this.dateObj.minDate = new Date(this.minDate);
      }
    }
  },
  watch: {
    value: {
      handler: function() {
        const startDate = new Date(this.value);
        if (startDate.toString() !== this.outValue) {
          this.outUpdate = !this.outUpdate;
        }
        this.initilaze(startDate);
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss">
.picker-border {
  border: 1px solid #1867c0;
}
.picker-container {
  text-align: left;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  .picker-display {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .picker-header {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    color: #fff;
    background-color: #1867c0;
    padding: 16px;
    .picker-sub-container {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .picker-time {
        transition: color 0.3s;
        cursor: pointer;
        font-size: 15px;
        font-weight: 500;
        line-height: 1;
      }
      .picker-time:hover {
        color: #9aa0a7;
      }
    }
    .picker-year {
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      span {
        transition: color 0.3s;
      }
      span:hover {
        color: #9aa0a7;
      }
    }
    .picker-head {
      font-size: 30px;
      font-weight: 500;
      line-height: 1;
      span {
        transition: color 0.3s;
        cursor: pointer;
      }
      span:hover {
        color: #9aa0a7;
      }
    }
  }
}
</style>
