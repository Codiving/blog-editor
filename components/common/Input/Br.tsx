import styled from "@emotion/styled";
import { InputProps } from ".";

const Container = styled("div")(() => ({
  fontSize: 4,
  border: "1px solid lightgray",
  display: "flex",
  alignItems: "center"
}));

type Props = Pick<InputProps, "onDelete">;

const Br = (props: Props) => {
  const { onDelete } = props;

  return (
    <Container>
      <label>줄바꿈</label>
      <button tabIndex={-1} onClick={onDelete()}>
        D
      </button>
    </Container>
  );
};

export default Br;
