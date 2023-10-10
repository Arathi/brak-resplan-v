import {defineStore} from "pinia";
import Student from "../domains/Student";

interface State {
  students: Student[];
}

const storage = window.localStorage;

const KEY_STUDENTS = "save.students";


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
  actions: {
    /**
     * 从localStorage加载存档
     */
    loadFromStorage() {
      console.info("加载所有学生信息");
      const local = storage.getItem(KEY_STUDENTS);
      if (local == null) {
        storage.setItem(KEY_STUDENTS, "[]");
      }
      else {
        this.students = JSON.parse(local);
      }
    },

    /**
     * 保存学生信息到localStorage
     */
    saveStudentsToStorage() {
      console.info("开始保存所有学生信息");
      let json = JSON.stringify(this.students);
      storage.setItem(KEY_STUDENTS, json);
    },

    /**
     * 更新学生信息
     * @param stu 
     */
    updateStudent(stu: Student) {
      const index = this.students.findIndex(s => s.id == stu.id);
      if (index != -1) {
        // console.info("学生数据已存在，更新");
        this.students[index] = stu;
      }
      else {
        // console.info("学生数据不存在，新建");
        this.students.push(stu);
      }
    },
  },
});
