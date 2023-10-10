import {defineStore} from "pinia";
import {Language} from "../domains/types";

interface State {
  schaleBaseURL: string;
  language: Language;
}

export const useSettingStore = defineStore("setting", {
  state: (): State => ({
    schaleBaseURL: "https://schale.gg",
    language: "cn",
  }),
  getters: {},
  actions: {},
});