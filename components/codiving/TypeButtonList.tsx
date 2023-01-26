import styled from "@emotion/styled";
import { useCallback } from "react";
import { CODIVING_TYPE_LIST } from "types/codiving";
import { TypeList } from "types/common";

const Container = styled("div")(() => ({}));

interface Props {
  onAddList: (type: TypeList) => void;
}

const TypeButtonList = (props: Props) => {
  const { onAddList: _onAddList } = props;

  const onAddList = useCallback(
    (type: TypeList) => () => {
      _onAddList(type);
    },
    [_onAddList]
  );

  return (
    <Container>
      {CODIVING_TYPE_LIST.map(({ type, label, hidden }) => {
        if (hidden) return null;
        return (
          <button key={label} onClick={onAddList(type)}>
            {label}
          </button>
        );
      })}
    </Container>
  );
};

export default TypeButtonList;
