import { CodivingClassNames, CodivingLabel, CodivingType } from "./codiving";
import { PersonalClassNames, PersonalLabel, PersonalType } from "./personal";

export const BLOG = ["codiving", "personal"] as const;
export type Blog = typeof BLOG[number];
export type ClassNames = CodivingClassNames | PersonalClassNames;
export type TypeList = CodivingType | PersonalType;
export type TypeLabel = CodivingLabel | PersonalLabel;

export interface List {
  type: TypeList;
  label: TypeLabel;
  value: string;
  bold: string[];
  red: string[];
  yellow: string[];
  green: string[];
}
export const INIT_VALUE: List = {
  type: "",
  label: "",
  value: "",
  bold: [],
  red: [],
  yellow: [],
  green: []
};
