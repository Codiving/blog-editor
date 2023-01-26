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

export const PERSONAL_TYPE = [
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

export const PERSONAL_LABEL = [
  "제목",
  "소제목",
  "내용1",
  "줄바꿈",
  "볼드",
  "볼드라인",
  "이미지",
  "초록색링크",
  "노란색링크",
  "빨간색링크",
  ""
];

export type PersonalLabel = typeof PERSONAL_LABEL[number];

type PersonalTypeList = {
  label: PersonalLabel;
  type: PersonalType;
  hidden: boolean;
};

export const PERSONAL_TYPE_LIST: PersonalTypeList[] = [
  { label: "제목", type: "title", hidden: false },
  { label: "소제목", type: "sub_title", hidden: false },
  { label: "내용1", type: "content_content1", hidden: false },
  { label: "줄바꿈", type: "br", hidden: false },
  { label: "볼드", type: "bold", hidden: true },
  { label: "볼드라인", type: "bold_line", hidden: true },
  { label: "이미지", type: "image", hidden: false },
  { label: "초록색링크", type: "my_link", hidden: true },
  { label: "노란색링크", type: "y_mark", hidden: true },
  { label: "빨간색링크", type: "r_mark", hidden: true },
  { label: "", type: "", hidden: true }
];
