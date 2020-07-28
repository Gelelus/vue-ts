<template>
  <div class="month-picker-container">
    <div class="month-picker-header">
      <span @click="nextYear(0)" class="chevron-container"
        ><i class="chevron chevron-left"></i
      ></span>
      <button @click="setYearPicker()">
        {{ year }}
      </button>
      <span @click="nextYear(1)" class="chevron-container"
        ><i class="chevron chevron-right"></i
      ></span>
    </div>
    <div class="month-picker-table">
      <table>
        <tbody>
          <tr v-for="i in 4" :key="i">
            <td v-for="j in 3" :key="j">
              <button
                @click="setDayPicker(j + 3 * i - 4)"
                :disabled="disable(j + 3 * i - 4)"
              >
                {{ monthOfYear[j + 3 * i - 4].slice(0, 3) }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "month-picker",
  data: () => ({
    year: 2020,
    maxYear: Infinity,
    maxMonth: 11,
    minYear: 1,
    minMonth: 0
  }),
  props: {
    dateObj: Object,
    vueMode: Object,
    monthOfYear: Array
  },
  methods: {
    setDayPicker(month) {
      this.dateObj.year = this.year;
      this.vueMode.payload = month;
      this.vueMode.component = "DayPicker";
    },
    setYearPicker() {
      this.vueMode.component = "YearPicker";
    },
    nextYear(val) {
      if (val && this.year < this.maxYear) {
        this.year++;
      } else if (!val && this.year > this.minYear) {
        this.year--;
      }
    },
    disable(month) {
      if (this.maxYear === this.year) {
        if (month > this.maxMonth) {
          return true;
        }
        return false;
      } else if (this.minYear === this.year) {
        if (month < this.minMonth) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    }
  },
  created: function() {
    this.year = this.dateObj.year;
    if (this.dateObj.maxDate) {
      this.maxYear = this.dateObj.maxDate.getFullYear();
      this.maxMonth = this.dateObj.maxDate.getMonth();
    }
    if (this.dateObj.minDate) {
      this.minYear = this.dateObj.minDate.getFullYear();
      this.minMonth = this.dateObj.minDate.getMonth();
    }
  }
};
</script>

<style lang="scss">
.month-picker-container {
  height: 280px;
  .month-picker-header {
    padding: 4px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    button {
      transition: background-color 0.3s;
      padding: 0.4em 2em 0.4em 2em;
      border-radius: 5px;
      outline: none;
    }
    button:hover {
      background-color: rgb(219, 216, 216);
    }
    .chevron-container:hover {
      border-radius: 10px;
      background-color: rgb(219, 216, 216);
    }
    .chevron-container {
      padding: 0.2em 0.4em 0 0.2em;
      cursor: pointer;
      .chevron {
        display: inline-block;
        height: 0.8em;
        position: relative;
        width: 0.6em;
        margin: 0em 0.5em 0em 0.5em;
      }
      .chevron:before {
        display: block;
        content: "";
        width: 0;
        height: 0em;
        border-style: solid;
        position: absolute;
      }
      .chevron-right:before {
        right: 0;
        border-width: 0.4em 0 0.4em 0.4em;
        border-color: transparent transparent transparent gray;
      }
      .chevron-left:before {
        right: 0;
        border-width: 0.4em 0.4em 0.4em 0;
        border-color: transparent gray transparent transparent;
      }
    }
  }
  .month-picker-table {
    table {
      table-layout: fixed;
      padding: 8px 0;
      font-weight: 600;
      text-align: center;
      width: 100%;
      font-size: 12px;
      th {
        color: rgba(0, 0, 0, 0.38);
      }
      th,
      td {
        button {
          outline: none;
          transition: background-color 0.3s;
          height: 52px;
          width: 90px;
          color: black;
          font-size: 1.4em;
          color: rgb(78, 78, 78);
          border-radius: 10px;
        }
        button:hover {
          background-color: rgb(219, 216, 216);
        }
        button:disabled {
          color: rgb(165, 163, 163);
        }
      }
    }
  }
}
</style>
