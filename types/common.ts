export const BLOG = ["codiving", "personal"] as const;
export type Blog = typeof BLOG[number];

export const CLASS_NAMES = [
  ".title",
  ".sub_title",
  ".last_title",
  ".content_content1",
  ".mini_title",
  ".ul",
  ".ul li",
  ".my_link",
  ".y_mark",
  ".r_mark",
  ".bold",
  ".bold_line",
  ".image",
  ".warn_title",
  ".err_msg",
  ".gist",
  ".map",
  "br",
  ""
] as const;
export type ClassNames = typeof CLASS_NAMES[number];

export const REMOVED_CLASS_NAMES = ["br", ""] as const;

export const LABEL = [
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
  "지도",
  ""
] as const;
export type Label = typeof LABEL[number];

type ButtonList = {
  label: Label;
  type: ClassNames;
  hidden: boolean;
};

export const CODIVING_BUTTON_LIST: ButtonList[] = [
  { label: "제목", type: ".title", hidden: false },
  { label: "소제목", type: ".sub_title", hidden: false },
  { label: "문단제목", type: ".mini_title", hidden: false },
  { label: "내용1", type: ".content_content1", hidden: false },
  { label: "줄바꿈", type: "br", hidden: false },
  { label: "볼드", type: ".bold", hidden: true },
  { label: "볼드라인", type: ".bold_line", hidden: true },
  { label: "이미지", type: ".image", hidden: false },
  { label: "초록색링크", type: ".my_link", hidden: true },
  { label: "노란색링크", type: ".y_mark", hidden: true },
  { label: "빨간색링크", type: ".r_mark", hidden: true },
  { label: "", type: "", hidden: true }
];

export const PERSONAL_BUTTON_LIST: ButtonList[] = [
  { label: "제목", type: ".title", hidden: false },
  { label: "소제목", type: ".sub_title", hidden: false },
  { label: "문단제목", type: ".mini_title", hidden: false },
  { label: "내용1", type: ".content_content1", hidden: false },
  { label: "줄바꿈", type: "br", hidden: false },
  { label: "볼드", type: ".bold", hidden: true },
  { label: "볼드라인", type: ".bold_line", hidden: true },
  { label: "이미지", type: ".image", hidden: false },
  { label: "초록색링크", type: ".my_link", hidden: true },
  { label: "노란색링크", type: ".y_mark", hidden: true },
  { label: "빨간색링크", type: ".r_mark", hidden: true },
  { label: "지도", type: ".map", hidden: false },
  { label: "", type: "", hidden: true }
];

export const TOTAL_BUTTON_LIST = Array.from(
  new Set([...CODIVING_BUTTON_LIST, ...PERSONAL_BUTTON_LIST])
);

export interface List {
  type: ClassNames;
  label: Label;
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
