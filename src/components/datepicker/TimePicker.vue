<template>
  <div class="time-picker-container">
    <span class="timer-close" @click="vueMode.component = 'DayPicker'"
      >close</span
    >
    <ul class="hour-picker">
      <p>HH</p>
      <li v-for="i in 24" :key="i" @click="setTime(i - 1, 'h')">
        {{ prittyTime(i - 1) }}
      </li>
    </ul>
    <ul class="min-picker">
      <p>mm</p>
      <li v-for="i in 60" :key="i" @click="setTime(i - 1, 'm')">
        {{ prittyTime(i - 1) }}
      </li>
    </ul>
    <ul class="sec-picker" v-if="displaySec">
      <p>ss</p>
      <li v-for="i in 60" :key="i" @click="setTime(i - 1, 's')">
        {{ prittyTime(i - 1) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "year-picker",
  data: () => ({
    hour: 12,
    min: 15
  }),
  props: {
    dateObj: Object,
    vueMode: Object,
    displaySec: Boolean
  },
  methods: {
    setTime(t, type) {
      this.dateObj[type] = this.prittyTime(t);
      this.$emit("change");
    },
    prittyTime(i) {
      return ("0" + i).slice(-2);
    }
  },
  created: function() {
    this.hour = this.dateObj.h;
    this.min = this.dateObj.m;
  }
};
</script>

<style lang="scss">
.time-picker-container {
  position: relative;
  height: 280px;
  display: flex;
  justify-content: space-between;
  .timer-close {
    transition: color 0.3s;
    position: absolute;
    right: 1em;
    top: -1.4em;
    color: white;
    cursor: pointer;
  }
  .timer-close:hover {
    color: rgb(219, 216, 216);
  }
  ul {
    position: relative;
    width: 50%;
    overflow: auto;
    padding: 0;
    p {
      position: sticky;
      background-color: white;
      top: 0;
      text-align: center;
      font-weight: 500;
      padding: 0.5em;
      margin: 0;
    }
    li {
      cursor: pointer;
      padding: 0.5em;
      list-style-type: none;
      transition: background-color 0.3s;
      text-align: center;
      font-weight: 500;
    }
    li:hover {
      background-color: rgb(219, 216, 216);
    }
  }
}
</style>
