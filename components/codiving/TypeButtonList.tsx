import styled from "@emotion/styled";
import { useCallback, useMemo } from "react";
import {
  Blog,
  ClassNames,
  CODIVING_BUTTON_LIST,
  PERSONAL_BUTTON_LIST
} from "types/common";

const Container = styled("div")(() => ({}));

interface Props {
  blog: Blog;
  onAddList: (type: ClassNames) => void;
}

const TypeButtonList = (props: Props) => {
  const { blog, onAddList } = props;

  const list = useMemo(() => {
    return blog === "codiving" ? CODIVING_BUTTON_LIST : PERSONAL_BUTTON_LIST;
  }, [blog]);

  return (
    <Container>
      {list.map(({ type, label, hidden }) => {
        if (hidden) return null;
        return (
          <button key={label} onClick={() => onAddList(type)}>
            {label}
          </button>
        );
      })}
    </Container>
  );
};

export default TypeButtonList;
