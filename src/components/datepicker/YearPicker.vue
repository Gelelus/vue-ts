<template>
  <div class="year-picker-container">
    <ul>
      <li v-for="(item, i) in data" :key="i" @click="setMonthPicker(item)">
        <span v-if="item === year" ref="element">{{ item }}</span>
        <span v-else>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "year-picker",
  data: () => ({
    year: 2020
  }),
  computed: {
    data() {
      let startYear = this.minYear;
      const endYear = this.maxYear;
      const data = [];
      for (let i = 0; startYear <= endYear; i++) {
        data[i] = startYear;
        startYear++;
      }
      return data;
    },
    maxYear() {
      if (this.dateObj.maxDate) {
        return this.dateObj.maxDate.getFullYear();
      } else {
        return this.year + 100;
      }
    },
    minYear() {
      if (this.dateObj.minDate) {
        return this.dateObj.minDate.getFullYear();
      } else {
        return this.year - 100 > 0 ? this.year - 100 : 1;
      }
    }
  },
  props: {
    dateObj: Object,
    vueMode: Object
  },
  methods: {
    setMonthPicker(year) {
      this.dateObj.year = year;
      this.vueMode.component = "MonthPicker";
    }
  },
  created: function() {
    this.year = this.dateObj.year;
  },
  mounted: function() {
    this.$refs.element[0].style = "font-size: 26px; color: #1867c0";
    this.$refs.element[0].scrollIntoView({
      block: "center"
    });
  }
};
</script>

<style lang="scss">
.year-picker-container {
  height: 280px;
  overflow: auto;
  ul {
    margin: 0;
    padding: 0;
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
