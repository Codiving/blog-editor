import { CodivingClassNames } from "./codiving";
import { PersonalClassNames } from "./personal";

export const BLOG = ["codiving", "personal"] as const;
export type Blog = typeof BLOG[number];
export type ClassNames = CodivingClassNames | PersonalClassNames;
