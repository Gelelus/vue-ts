<template>
  <v-dialog :value="dialog" @input="closeDialog" max-width="500px">
    <v-card>
      <span @click="endPicker()">
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <template v-if="!edited">
              <div v-if="datePicker" class="border-picker" @click.stop>
                <app-datepicker
                  :value="editedTodo.date"
                  @input="setDate"
                  width="230px"
                  :displayHeader="false"
                />
              </div>
              <v-row
                :class="{
                  correct: correct,
                  uncorrect: !correct,
                }"
              >
                <v-col>
                  <input
                    ref="inp"
                    class="date-input"
                    :value="prittyDate"
                    @click.stop="datePicker = true"
                  />
                </v-col>
              </v-row>
            </template>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedTodo.name" label="Todo name" />
              </v-col>
              <v-col cols="12" sm="6" md="4" v-if="!edited">
                <v-select
                  v-model="editedTodo.todoType"
                  :items="selectItems"
                  label="Type of Todo"
                />
              </v-col>
              <v-col cols="12" sm="12" md="8">
                <v-textarea
                  v-model="editedTodo.description"
                  label="Todo description"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save" :disabled="!correct"
            >Save</v-btn
          >
        </v-card-actions>
      </span>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter, Action, Mutation } from "vuex-class";

import { Todo } from "../../../store/modules/todo/types";
import datepicker from "../../../components/datepicker/index.vue";
import { ActionMutationType } from "../../../store/types";

@Component({
  components: {
    appDatepicker: datepicker,
  },
})
export default class AppTodoDetail extends Vue {
  selectItems = ["Common", "EveryDay", "EveryWeek", "EveryMonth"];
  selectType = "Common";
  datePicker = false;
  correct = true;

  get formTitle() {
    return !this.edited ? "New Todo" : "Edit Todo";
  }
  get prittyDate() {
    return new Date(this.editedTodo.date).toString().slice(0, 21);
  }

  @Getter("dialog") dialog!: boolean;
  @Getter("editedTodo") editedTodo!: Todo;
  @Getter("edited") edited!: boolean;

  @Action("addTodo") addTodo!: ActionMutationType<Todo>;
  @Action("editTodo") editTodo!: ActionMutationType<Todo>;

  @Mutation("closeDialog") closeDialog!: ActionMutationType<Todo>;
  @Mutation("editMode") editMode!: ActionMutationType<boolean>;

  close() {
    this.editMode(false);
  }
  endPicker() {
    this.datePicker = false;
    const inputValue = this.$refs.inp as HTMLInputElement;
    if (new Date(inputValue.value).toString() === "Invalid Date") {
      this.correct = false;
    }
    this.editedTodo.date = inputValue.value;
  }
  save() {
    if (this.edited) {
      this.editTodo({ ...this.editedTodo });
    } else {
      this.addTodo({ ...this.editedTodo });
    }
    this.close();
  }
  setDate(date: Date) {
    this.editedTodo.date = date;
    this.correct = true;
  }

  @Watch("dialog") function(val: boolean) {
    val || this.close();
  }
}
</script>

<style>
.border-picker {
  z-index: 1;
  background-color: white;
  position: absolute;
  display: inline-block;
  border: 1px solid rgb(156, 153, 153);
  top: 10em;
  left: 28%;
}
.v-card {
  position: relative;
}
.date-input {
  font-size: 2em;
  cursor: pointer;
}
.correct {
  background: #28ec370d;
}
.uncorrect {
  background: #ff000012;
}
</style>
