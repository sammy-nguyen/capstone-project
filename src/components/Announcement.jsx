import styled from "styled-components";

const Container = styled.div`
  height: 40px;
  background-color: black;
  color: yellow;
  font-size: 19px;
  font-weight: bold;
  display: flex;
  letter-spacing: 4px;
  align-items: center;
  justify-content: center;
  text-shadow: blue 2px 2px;
`;

const Announcement = () => {
  return (
    <Container>FREE STANDARD SHIPPING on Order $70+ LIMITED TIME</Container>
  );
};
export default Announcement;
