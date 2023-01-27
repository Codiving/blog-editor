import styled from "@emotion/styled";

const Container = styled("div")(() => ({
  marginBottom: 10
}));

const Title = styled("p")(() => ({
  fontWeight: "bold",
  margin: 0
}));

const Content = styled("p")(() => ({
  margin: 0,
  fontSize: 14
}));

const Manual = () => {
  return (
    <Container>
      <Title># 단축기</Title>
      <Content>- 줄바꿈 추가 : crtl + shift + Enter</Content>
      <Content>- 다음 칸 이동 추가 : Enter</Content>
      <Content>- 다음 칸 이동 추가 : crtl + Enter</Content>
    </Container>
  );
};

export default Manual;
