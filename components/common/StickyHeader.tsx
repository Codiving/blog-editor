import styled from "@emotion/styled";

const StickyHeader = styled("div")(() => ({
  position: "sticky",
  top: 0,
  backgroundColor: "white",
  boxShadow: "0 3px 0 rgb(57 63 72 / 30%)",
  padding: "8px 0",
  marginBottom: 10
}));

export default StickyHeader;
