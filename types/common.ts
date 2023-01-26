import { CodivingClassNames, CodivingType } from "./codiving";
import { PersonalClassNames, PersonalType } from "./personal";

export const BLOG = ["codiving", "personal"] as const;
export type Blog = typeof BLOG[number];
export type ClassNames = CodivingClassNames | PersonalClassNames;
export type TypeList = CodivingType | PersonalType;

export interface List {
  type: TypeList;
  value: string;
  bold: string[];
  red: string[];
  yellow: string[];
  green: string[];
}
export const INIT_VALUE: List = {
  type: "",
  value: "",
  bold: [],
  red: [],
  yellow: [],
  green: []
};
