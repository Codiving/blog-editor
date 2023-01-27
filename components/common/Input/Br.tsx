import styled from "@emotion/styled";
import { InputProps } from ".";

const Container = styled("div")(() => ({
  fontSize: 4,
  border: "1px solid lightgray",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}));

type Props = Omit<InputProps, "type" | "label">;

const Br = (props: Props) => {
  const { onDelete, ...rest } = props;

  return (
    <Container>
      <div>
        <label>줄바꿈</label>
        <input className="input" {...rest} style={{ height: 1, width: 1 }} />
      </div>
      <button tabIndex={-1} onClick={onDelete()}>
        D
      </button>
    </Container>
  );
};

export default Br;
