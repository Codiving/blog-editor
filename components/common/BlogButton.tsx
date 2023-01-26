import styled from "@emotion/styled";
import { useCallback } from "react";
import { Blog } from "types/common";

const Container = styled("div")(() => ({
  marginBottom: 10
}));

const Title = styled("p")(() => ({
  margin: 0
}));

const Button = styled("button")<{ value: Blog; current: Blog }>(
  ({ value, current }) => ({
    backgroundColor: value === current ? "pink" : undefined
  })
);

interface Props {
  value: Blog;
  onChange: (value: Blog) => void;
}

const BlogButton = (props: Props) => {
  const { value, onChange } = props;

  const onClickCodiving = useCallback(() => {
    onChange("codiving");
  }, [onChange]);

  const onClickPersonal = useCallback(() => {
    onChange("personal");
  }, [onChange]);

  return (
    <Container>
      <Title># 블로그 선택</Title>
      <Button value={value} current="codiving" onClick={onClickCodiving}>
        Codiving
      </Button>
      <Button value={value} current="personal" onClick={onClickPersonal}>
        Personal
      </Button>
    </Container>
  );
};

export default BlogButton;
