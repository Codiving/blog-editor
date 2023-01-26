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

export const CODIVING_TYPE = [
  "title",
  "sub_title",
  "mini_title",
  "content_content1",
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

export const CODIVING_LABEL = [
  "제목",
  "소제목",
  "문단제목",
  "내용1",
  "줄바꿈",
  "볼드",
  "볼드라인",
  "이미지",
  "초록색링크",
  "노란색링크",
  "빨간색링크",
  "출처",
  ""
] as const;

export type CodivingLabel = typeof CODIVING_LABEL[number];

type CodivingTypeList = {
  label: CodivingLabel;
  type: CodivingType;
  hidden: boolean;
};

export const CODIVING_TYPE_LIST: CodivingTypeList[] = [
  { label: "제목", type: "title", hidden: false },
  { label: "소제목", type: "sub_title", hidden: false },
  { label: "문단제목", type: "mini_title", hidden: false },
  { label: "내용1", type: "content_content1", hidden: false },
  { label: "줄바꿈", type: "br", hidden: false },
  { label: "볼드", type: "bold", hidden: true },
  { label: "볼드라인", type: "bold_line", hidden: true },
  { label: "이미지", type: "image", hidden: false },
  { label: "초록색링크", type: "my_link", hidden: true },
  { label: "노란색링크", type: "y_mark", hidden: true },
  { label: "빨간색링크", type: "r_mark", hidden: true },
  { label: "출처", type: "reference", hidden: true },
  { label: "", type: "", hidden: true }
];

export const CODIVING_MINI_TITLE_PREFIX = "◆";
