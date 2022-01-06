import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
`;

const Wrapper = styled.div`
  height: 100%;
`;
const Slide = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div`
  height: 95%;
  flex: 1;
`;
const Image = styled.img`
  height: 100%;
  width: 100vw;
  position: absolute;
`;
const InfoContainer = styled.div`
  padding-bottom: 260px;
  flex: 1;
`;
const Title = styled.h1`
  position: relative;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 8px #ffdc5e;
  font-size: 35px;
`;
const Desc = styled.p`
  position: relative;
  color: white;
  text-shadow: 2px 2px 4px #000000;
  font-weight: bold;
  font-size: 30px;
  letter-spacing: 2px;
`;
const Button = styled.button`
  position: relative;
  font-size: 20px;
  background-color: white;
  color: #252422;
  font-weight: bolder;
  text-shadow: 2px 2px 4px #7d8597;
  letter-spacing: 2px;
  box-shadow: 2px 2px 4px #252422;
  padding: 10px 20px;
  cursor: pointer;
`;
const LandingPage = () => {
  return (
    <Container>
      <Wrapper>
        <Slide>
          <ImgContainer>
            <Image
              src={`https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`}
            />
          </ImgContainer>
          <InfoContainer>
            <Title>SALE SALE SALE</Title>
            <Desc>GET FLAT 30% OFF FOR NEW ARRIVALS</Desc>
            <Link to="/products/all">
              <Button>SHOP NOW</Button>
            </Link>
          </InfoContainer>
        </Slide>
      </Wrapper>
    </Container>
  );
};

export default LandingPage;
