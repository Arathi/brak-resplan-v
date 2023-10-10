<script setup lang="ts">
import {computed} from "vue";
import {useSettingStore} from "../../stores/SettingStore";
import {useMetadataStore} from "../../stores/MetadataStore";
import {useSaveStore} from "../../stores/SaveStore";

const settings = useSettingStore();
const metadataStore = useMetadataStore();
const saveStore = useSaveStore();

const props = defineProps<{
  studentId: number;
}>();

const metadata = computed(() => metadataStore.getStudentById(props.studentId));
const student = computed(() => saveStore.getStudentById(props.studentId));

const owned = computed(() => student.value != undefined);

const avatarURL = computed(() => {
  if (metadata.value == undefined) {
    console.warn(`学生${props.studentId}的元数据不存在`);
    return undefined;
  }
  return `${settings.schaleBaseURL}/images/student/icon/${props.studentId}.webp`;
});

const rankURL = computed(() => {
  if (metadata.value == undefined) {
    console.warn(`学生${props.studentId}的元数据不存在`);
    return `${settings.schaleBaseURL}/images/ui/Common_Icon_Formation_Star_Disable.png`;
  }

  let rank: number = metadata.value?.rarity as number;
  if (student.value != undefined) {
    rank = student.value.rank;
  }

  return `${settings.schaleBaseURL}/images/ui/Common_Icon_Formation_Star_R${rank}.png`;
});

</script>

<template>
  <div class="student-icon">
    <div class="upper">
      <div class="borders">
      </div>
      <div class="icon">
        <img class="avatar"
             :src="avatarURL"
             :alt="metadata?.name"
        />
        <img class="rank"
             :src="rankURL"
             :alt="`星级`"
        />
        <div class="attack-type"></div>
        <div class="armor-type"></div>
        <div class="combat-class"></div>
        <template v-if="owned">
          <span class="student-level"></span>
          <span class="skill-levels"></span>
          <span class="equip-tiers"></span>
          <span class="relation"></span>
        </template>
        <template v-if="!owned">
          <span class="student-id"></span>
        </template>
      </div>
    </div>
    <div class="lower">
      <span class="student-name">{{metadata?.name}}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
@avatarSize: 120px;
@avatarMargin: 10px;
@nameLabelHeight: 32px;

.student-icon {
  display: flex;
  flex-direction: column;
  width: @avatarSize + 2*@avatarMargin;

  .upper {
    background-color: red;
    height: @avatarSize + 2*@avatarMargin;

    .icon {
      position: relative;
      width: @avatarSize;
      height: @avatarSize;
      margin: @avatarMargin;

      .avatar {
        position: absolute;

        left: 0px;
        top: 0px;

        width: 120px;
        height: 120px;
      }

      @rankScale: 0.65;
      .rank {
        position: absolute;
        left: 0px;
        bottom: 0px;

        width: 46px * @rankScale;
        height: 44px * @rankScale;
      }

      .color-block {
        display: block;
        width: @avatarSize / 2;
        height: 10px;
      }

      .explosive, .light {
        color: red;
      }

      .piercing, .heavy {
        color: orange;
      }

      .mystic, .special {
        color: cornflowerblue;
      }

      .sonic, .elastic {
        color: purple;
      }

      .attack-type {
        .color-block();
        position: absolute;
        left: 0px;
        bottom: 0px;
        color: red;
      }

      .armor-type {
        .color-block();
        display: block;
        position: absolute;
        left: @avatarSize / 2;
        bottom: 0px;
        color: blue;
      }
    }
  }

  .lower {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    height: @nameLabelHeight;
    background-color: green;

    .student-name {
      color: white;
    }
  }
}
</style>