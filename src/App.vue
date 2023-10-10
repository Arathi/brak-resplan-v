<script setup lang="ts">
import StudentIcon from "./components/students/Icon.vue";
import StudentList from "./components/students/List.vue";
import {onMounted} from "vue";
import {useMetadataStore} from "./stores/MetadataStore.ts";

const metadataStore = useMetadataStore();

onMounted(() => {
  metadataStore.reload();
});
</script>

<template>
  <div class="app">
    <div class="header">
      <router-link to="/">首页</router-link>
      <router-link to="/test">测试</router-link>
    </div>
    <div class="body">
      <router-view />
    </div>
  </div>
  <student-list />
</template>

<style scoped lang="less">
.app {
  display: flex;
  flex-direction: column;

  .header {
    width: 100%;
    height: 32px;
    background-color: gray;
  }

  .body {
    background-color: burlywood;
  }
}
</style>
