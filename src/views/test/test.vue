<template>
  <div>
    <br />
    <input v-model="date" placeholder="отредактируй меня" style="width: 60%" />
    <br />
    <div class="test-vue">
      <span class="test-border">
        <app-datepicker
          v-model="date"
          :first-day-of-week="firstDayOfWeek"
          :header-date-format="dateFormat"
          :displaySec="false"
          :maxDate="maxDate"
          :minDate="minDate"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import datepicker from "../../components/datepicker/index.vue";

@Component({
  components: {
    appDatepicker: datepicker,
  },
})
export default class AppTestPage extends Vue {
  date = new Date();
  maxDate = new Date(2040, 1, 10);
  minDate = new Date(2000, 3, 12);
  firstDayOfWeek = "1";
  dateFormat = "xxx-ddd-ddd";
}
</script>

<style lang="scss">
.test-vue {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  .test-border {
    border-left: 1px solid rgb(23, 36, 148);
    border-right: 1px solid rgb(23, 36, 148);
    border-bottom: 1px solid rgb(23, 36, 148);
  }
}
</style>
