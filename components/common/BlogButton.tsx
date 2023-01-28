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

const Flex = styled("div")(() => ({
  display: "flex",
  gap: 10
}));

interface Props {
  value: Blog;
  onChange: (value: Blog) => void;
  onCopy: () => void;
}

const BlogButton = (props: Props) => {
  const { value, onChange, onCopy } = props;

  const onClickCodiving = useCallback(() => {
    onChange("codiving");
  }, [onChange]);

  const onClickPersonal = useCallback(() => {
    onChange("personal");
  }, [onChange]);

  return (
    <Container>
      <Title># 블로그 선택</Title>
      <Flex>
        <div>
          <Button value={value} current="codiving" onClick={onClickCodiving}>
            Codiving
          </Button>
          <Button value={value} current="personal" onClick={onClickPersonal}>
            Personal
          </Button>
        </div>
        <button onClick={onCopy}>Copy</button>
      </Flex>
    </Container>
  );
};

export default BlogButton;
