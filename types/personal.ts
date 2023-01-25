export const PERSONAL_PREFIX = "personal-";

export const PERSONAL_CLASS_NAMES = [
  ".personal-title",
  ".personal-title_description",
  ".personal-sub_title",
  ".personal-sub_title_content",
  ".personal-last_title",
  ".personal-content_title1",
  ".personal-content_content1",
  ".personal-ul",
  ".personal-ul li",
  ".personal-my_link",
  ".personal-y_mark",
  ".personal-r_mark",
  ".personal-bold",
  ".personal-bold_line",
  ".personal-image",
  ".personal-warn_title",
  ".personal-map"
] as const;
export type PersonalClassNames = typeof PERSONAL_CLASS_NAMES[number];

const PERSONAL_TYPE = [
  "title",
  "sub_title",
  "content_content1",
  "br",
  "bold",
  "bold_line",
  "image",
  "my_link",
  "y_mark",
  "r_mark",
  ""
] as const;
export type PersonalType = typeof PERSONAL_TYPE[number];
