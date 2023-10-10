import {defineStore} from "pinia";
import Student from "../domains/Student";

interface State {
  students: Student[];
}

export const useSaveStore = defineStore("save", {
  state: (): State => ({
    students: [],
  }),
  getters: {
    getStudentById: (state) => {
      return (id: number): Student | undefined =>
        state.students.find((s) => s.id === id);
    },
  },
  actions: {},
});
