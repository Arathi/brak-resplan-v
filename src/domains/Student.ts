import { Rank } from "./metadata/types";

/**
 * 学生信息
 */
export default interface Student {
  /**
   * 编号
   */
  id: number;

  /**
   * 等级
   */
  level: number;

  /**
   * 星级
   */
  rank: Rank;

  /**
   * 必杀技能
   */
  skillEx: number;

  /**
   * 普通技能
   */
  skillNormal: number;

  /**
   * 被动技能
   */
  skillPassive: number;

  /**
   * 辅助技能
   */
  skillSub: number;

  /**
   * 装备
   */
  equipments: number[];
}