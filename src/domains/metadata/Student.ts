import {
  Rarity,
  AttackType,
  ArmorType,
  Role,
  CombatClass,
  EquipmentCategory
} from "./types";

export default interface Student {
  /**
   * 编号
   */
  id: number;

  /**
   * 名称（英文编号）
   */
  name: string;

  /**
   * 稀有度
   */
  rarity: Rarity;

  /**
   * 攻击类型
   */
  attackType: AttackType;

  /**
   * 护甲类型
   */
  armorType: ArmorType;

  /**
   * 职责
   */
  role: Role;

  /**
   * 部队类型
   */
  combatClass: CombatClass;

  /**
   * 装备类型
   */
  equipmentCategories: EquipmentCategory[];
}