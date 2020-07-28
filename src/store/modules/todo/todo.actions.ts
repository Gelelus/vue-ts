import { ActionTree } from "vuex";
import axios from "axios";
import { TodoState, ResGetTodoList, Todo} from "./types";
import { RootState } from "../../types";

export const actions: ActionTree<TodoState, RootState> = {
    getTodoList({ commit }) {
        axios
          .get<ResGetTodoList>("http://localhost:4200/todo")
          .then(res => {
            const data = [
              ...res.data.monthTodos,
              ...res.data.weekTodos,
              ...res.data.dayTodos,
              ...res.data.commonTodos
            ];
            commit("setList", data);
          })
          .catch(err => {
            console.log(err);
          });
      },
      getDetailTodo({ commit }, payload: string) {
        axios
          .get<Todo>("http://localhost:4200/todo/" + payload)
          .then(res => {
            commit("setDetailTodo", res.data);
          })
          .catch(err => {
            console.log(err);
          });
      },
      addTodo: ({ dispatch }, payload: Todo) => {
        const postData = {
          name: payload.name,
          todoType: payload.todoType,
          description: payload.description,
          date: payload.date
        };
        axios
          .post("http://localhost:4200/todo", postData)
          .then(res => {
            console.log(res);
            if (res.status !== 400) {
              dispatch("getTodoList");
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      deleteTodo: ({ dispatch }, payload: string) => {
        axios
          .delete("http://localhost:4200/todo/" + payload)
          .then(res => {
            console.log(res);
            if (res.status !== 400) {
              dispatch("getTodoList");
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      editTodo: ({ dispatch }, payload: Todo) => {
        const putData = {
          todoType: payload.todoType || "Common",
          name: payload.name,
          description: payload.description,
          _id: payload._id,
          todoChecked: payload.todoChecked
        };
        axios
          .put("http://localhost:4200/todo/", putData)
          .then(res => {
            if (res.status !== 400) {
              dispatch("getTodoList");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    };