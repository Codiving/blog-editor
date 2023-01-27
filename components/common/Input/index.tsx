import styled from "@emotion/styled";
import { InputHTMLAttributes } from "react";
import { Label, ClassNames } from "types/common";
import Br from "./Br";

const Container = styled("div")(() => ({
  fontSize: 4,
  border: "1px solid lightgray",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}));

const InputField = styled("input")(() => ({
  flex: 1,
  height: 24
}));

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: ClassNames;
  label: Label;
  onDelete: () => () => void;
}

const Input = (props: InputProps) => {
  const { type, label, onDelete, ...rest } = props;

  if (type === "br") return <Br onDelete={onDelete} {...rest} />;

  return (
    <Container>
      <label>{label}</label>
      <div style={{ flex: 1, display: "flex" }}>
        <InputField className="input" {...rest} />
        <button tabIndex={-1} onClick={onDelete()}>
          D
        </button>
      </div>
    </Container>
  );
};

export default Input;
