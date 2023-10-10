<script setup lang="ts">
import {computed} from "vue";
import {useSettingStore} from "../../stores/SettingStore";
import {useMetadataStore} from "../../stores/MetadataStore";
import {useSaveStore} from "../../stores/SaveStore";
import { Role } from "../../domains/metadata/types";

const settings = useSettingStore();
const metadataStore = useMetadataStore();
const saveStore = useSaveStore();

const props = defineProps<{
  studentId: number;
}>();

const metadata = computed(() => metadataStore.getStudentById(props.studentId));
const student = computed(() => saveStore.getStudentById(props.studentId));

const owned = computed(() => student.value != undefined);

const avatar = computed(() => {
  let classes: string[] = ["avatar"];
  if (!owned.value) {
    classes.push("unowned");
  }
  return classes;
});

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

const attackType = computed(() => {
  let classes: string[] = ["attack-type attack-armor-block"];
  if (metadata.value != null) {
    classes.push(metadata.value.attackType);
  }
  return classes;
});

const armorType = computed(() => {
  let classes: string[] = ["armor-type attack-armor-block"];
  if (metadata.value != null) {
    classes.push(metadata.value.armorType);
  }
  return classes;
});

const combatClass = computed(() => {
  let classes: string[] = ["combat-class"];
  if (metadata.value != null) {
    classes.push(metadata.value.combatClass);
  }
  return classes;
});

const roleURL = computed(() => {
  if (metadata.value == null) {
    return undefined;
  }
  let roleName: string | null = null;
  switch (metadata.value.role) {
    case Role.Dealer:
      roleName = "DamageDealer";
      break;
    case Role.Healer:
      roleName = "Healer";
      break;
    case Role.Support:
      roleName = "Supporter";
      break;
    case Role.TacticalSupport:
      roleName = "Vehicle";
      break;
    case Role.Tank:
      roleName = "Tanker";
      break;
  }
  if (roleName == null) return undefined;
  return `${settings.schaleBaseURL}/images/ui/Role_${roleName}.png`;
});
</script>

<template>
  <div class="student-icon">
    <div class="upper">
      <div class="borders">
      </div>
      <div class="icon">
        <img
          :class="avatar"
          :src="avatarURL"
          :alt="metadata?.name"
        />
        <div class="attack-armor-types">
          <div :class="attackType"></div>
          <div :class="armorType"></div>
        </div>
        <div class="combat-class-role-block">
          <div :class="combatClass">
            <img
              class="role"
              :src="roleURL"
              alt="职责"
            />
          </div>
        </div>
        <img
          class="rank"
          :src="rankURL"
          alt="星级"
        />
        <template v-if="owned">
          <span class="student-level"></span>
          <span class="skill-levels"></span>
          <span class="equip-tiers"></span>
          <span class="relation"></span>
        </template>
        <template v-if="!owned">
          <span class="student-id">{{ `No.${props.studentId}` }}</span>
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
    background-color: gray;
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

        width: @avatarSize;
        height: @avatarSize;

        z-index: 0;
      }

      .unowned {
        filter: brightness(0.2);
      }

      @rankScale: 0.65;
      .rank {
        position: absolute;
        left: 2px;
        bottom: 2px;

        width: 46px * @rankScale;
        height: 44px * @rankScale;

        z-index: 2;
      }

      @colorBlockWidth: @avatarSize * 0.5;
      .attack-armor-block {
        display: block;
        width: @colorBlockWidth;
        height: 10px;
        opacity: 0.8;
      }

      .attack-armor-types {
        z-index: 1;
      
        .attack-type {
          position: absolute;
          left: 0px;
          bottom: 0px;
        }

        .armor-type {
          position: absolute;
          left: @colorBlockWidth;
          bottom: 0px;
        }

        .explosive, .light {
          background-color: red;
        }

        .piercing, .heavy {
          background-color: orange;
        }

        .mystic, .special {
          background-color: cornflowerblue;
        }

        .sonic, .elastic {
          background-color: purple;
        }
      }

      .combat-class-role-block {
        position: absolute;
        right: 2px;
        bottom: 2px;
        z-index: 3;

        .striker {
          background-color: red;
        }

        .special {
          background-color: blue;
        }

        .combat-class {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          border-radius: 25%;
          opacity: 0.75;

          width: 28px;
          height: 28px;

          .role {
            width: 24px;
            height: 24px;
          }
        }
      }

      .student-id {
        position: absolute;
        top: 2px;
        left: 4px;
        color: white;
        font-weight: bold;
        -webkit-text-stroke: 1px black;
      }
    }
  }

  .lower {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    height: @nameLabelHeight;
    background-color: #F3FBFD;

    .student-name {
      color: #60676F;
    }
  }
}
</style>