export const CODIVING_PREFIX = "codiving-";

export const CODIVING_CLASS_NAMES = [
  ".codiving-title",
  ".codiving-title_description",
  ".codiving-sub_title",
  ".codiving-sub_title_content",
  ".codiving-last_title",
  ".codiving-content_title1",
  ".codiving-content_content1",
  ".codiving-content_content2",
  ".codiving-mini_title",
  ".codiving-ul",
  ".codiving-ul li",
  ".codiving-my_link",
  ".codiving-y_mark",
  ".codiving-r_mark",
  ".codiving-bold",
  ".codiving-bold_line",
  ".codiving-image",
  ".codiving-warn_title",
  ".codiving-err_msg",
  ".codiving-gist"
] as const;
export type CodivingClassNames = typeof CODIVING_CLASS_NAMES[number];

const CODIVING_TYPE = [
  "title",
  "sub_title",
  "content_content1",
  "mini_title",
  "br",
  "bold",
  "bold_line",
  "image",
  "my_link",
  "y_mark",
  "r_mark",
  "reference",
  ""
] as const;
export type CodivingType = typeof CODIVING_TYPE[number];

export const CODIVING_MINI_TITLE_PREFIX = "◆";
