import styled from "@emotion/styled";
import { InputHTMLAttributes } from "react";
import { TypeLabel, TypeList } from "types/common";
import Br from "./Br";

const Container = styled("div")(() => ({
  fontSize: 4,
  border: "1px solid lightgray",
  display: "flex",
  alignItems: "center"
}));

const InputField = styled("input")(() => ({
  width: "90%",
  height: 24
}));

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: TypeList;
  label: TypeLabel;
  onDelete: () => () => void;
}

const Input = (props: InputProps) => {
  const { type, label, onDelete, ...rest } = props;

  if (type === "br") return <Br onDelete={onDelete} />;

  return (
    <Container>
      <label>{label}</label>
      <InputField {...rest} />
      <button tabIndex={-1} onClick={onDelete()}>
        D
      </button>
    </Container>
  );
};

export default Input;
