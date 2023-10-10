<script setup lang="ts">
import {computed} from "vue";
import StudentFilter from "./Filter.vue";
import StudentSorter from "./Sorter.vue";
import StudentIcon from './Icon.vue';
import {useMetadataStore} from "../../stores/MetadataStore";
import {useSaveStore} from "../../stores/SaveStore";
import Student from "../../domains/Student";
import StudentMetadata from "../../domains/metadata/Student";

const metadataStore = useMetadataStore();
const saveStore = useSaveStore();

const ownedStudents = computed(() => {
  const students: Student[] = [];
  students.push(...saveStore.students);
  // TODO 过滤
  // TODO 排序
  return students;
});

const unownedStudentIds = computed(() => {
  const students: StudentMetadata[] = [];
  students.push(...metadataStore.students);
  // TODO 过滤
  // TODO 排序
  return students;
});
</script>

<template>
  <div class="student-list">
    <student-filter />
    <student-sorter />
    <div class="scroll-list">
      <div class="list owned-list">
        <template v-for="student in ownedStudents">
          <student-icon :student-id="student.id"></student-icon>
        </template>
      </div>
      <div class="split-line">
        未持有
      </div>
      <div class="list unowned-list">
        <template v-for="student in unownedStudentIds">
          <student-icon :student-id="student.id"></student-icon>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@listWidth: 840px;
@scrollWidth: 20px;
@width: @listWidth + @scrollWidth;

@height: 600px;

.student-list {
  display: flex;
  flex-direction: column;
  background-color: gray;
  overflow: scroll;
  width: @width;
  height: @height;

  .split-line {
    display: flex;
    flex-direction: row;
    background-color: cadetblue;
    justify-content: center;
  }

  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}

</style>