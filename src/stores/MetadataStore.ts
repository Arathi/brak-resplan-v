import {defineStore} from "pinia";

import SchaleLoader from "../services/SchaleLoader";
import Student from "../domains/metadata/Student";
import { Language } from "../domains/types";

const loader = new SchaleLoader();

interface State {
  students: Student[];
  language: Language;
  i18n: any;
}

export const useMetadataStore = defineStore("metadata", {
  state: (): State => ({
    students: [],
    language: "zh",
    i18n: {},
  }),
  getters: {
    getStudentById: (state) => {
      return (id: number): Student | undefined =>
        state.students.find((s) => s.id === id);
    },
  },
  actions: {
    reload() {
      console.info("重新加载学生元数据");
      loader.loadStudents(this.language).then((list) => {
        console.info("学生元数据重新加载完成");
        this.students = list;
      });
    },
  },
});