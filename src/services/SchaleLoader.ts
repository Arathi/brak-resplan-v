import Axios, {AxiosInstance} from "axios";
import {Language} from "../domains/types";

import Student from "../domains/metadata/Student";
import {
  ArmorType,
  AttackType,
  CombatClass,
  EquipmentCategory,
  Role
} from "../domains/metadata/types";

const noLangDatas = ["config", "stages"];

export default class SchaleLoader {
  baseURL: string = "https://schale.gg";
  axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create();
  }

  async loadData(
    fileName: string,
    language: Language | null = null,
    useMin: boolean = false,
  ): Promise<any> {
    // 构建请求地址
    let lang = "";
    if (language != null && noLangDatas.findIndex(f => f == fileName) == -1) {
      lang = "/" + language;
    }
    let min = useMin ? ".min" : "";
    let url = `${this.baseURL}/data${lang}/${fileName}${min}.json`

    // 发送请求
    let resp = await this.axios.get(url);
    if (resp.status !== 200) {
      console.warn(`从schale.gg获取数据失败，状态码：${resp.status}`);
      return null;
    }

    return resp.data;
  }

  async loadStudents(language: Language, useMin: boolean = false): Promise<Student[]> {
    const dataList: any[] = await this.loadData("students", language, useMin);
    const students: Student[] = [];
    for (const data of dataList) {
      const student = this.convertStudent(data);
      students.push(student);
    }
    return students;
  }

  private convertStudent(data: any): Student {
    return {
      id: data.Id,
      name: data.PathName,
      rarity: data.StarGrade,
      attackType: this.convertAttackType(data.BulletType),
      armorType: this.convertArmorType(data.ArmorType),
      role: this.convertRole(data.TacticRole),
      combatClass: this.convertCombatClass(data.SquadType),
      equipmentCategories: [
        this.convertEquipmentCategory(data.Equipment[0]),
        this.convertEquipmentCategory(data.Equipment[1]),
        this.convertEquipmentCategory(data.Equipment[2]),
      ]
    } as Student;
  }

  private convertAttackType(value: string): AttackType {
    switch (value) {
      case 'Explosion': return AttackType.Explosive;
      case 'Pierce': return AttackType.Piercing;
      case 'Mystic': return AttackType.Mystic;
      case 'Sonic': return AttackType.Sonic;
    }
    throw new Error(`转换出错，未知的攻击类型${value}`);
  }

  private convertArmorType(value: string): ArmorType {
    switch (value) {
      case 'LightArmor': return ArmorType.Light;
      case 'HeavyArmor': return ArmorType.Heavy;
      case 'Unarmed': return ArmorType.Special;
      case 'ElasticArmor': return ArmorType.Elastic;
    }
    throw new Error(`转换出错，未知的护甲类型${value}`);
  }

  private convertRole(value: string): Role {
    switch (value) {
      case 'Tanker': return Role.Tank;
      case 'DamageDealer': return Role.Dealer;
      case 'Healer': return Role.Healer;
      case 'Supporter': return Role.Support;
      case 'Vehicle': return Role.TacticalSupport;
    }
    throw new Error(`转换出错，未知的职责${value}`);
  }

  private convertCombatClass(value: string): CombatClass {
    switch (value) {
      case 'Main': return CombatClass.Striker;
      case 'Support': return CombatClass.Special;
    }
    throw new Error(`转换出错，未知的部队类型${value}`);
  }

  private convertEquipmentCategory(value: string): EquipmentCategory {
    switch (value) {
      case 'Hat': return EquipmentCategory.Hat;
      case 'Gloves': return EquipmentCategory.Gloves;
      case 'Shoes': return EquipmentCategory.Shoes;
      case 'Bag': return EquipmentCategory.Bag;
      case 'Badge': return EquipmentCategory.Badge;
      case 'Hairpin': return EquipmentCategory.Hairpin;
      case 'Charm': return EquipmentCategory.Charm;
      case 'Watch': return EquipmentCategory.Watch;
      case 'Necklace': return EquipmentCategory.Necklace;
    }
    throw new Error(`转换出错，未知的装备类型${value}`);
  }
}