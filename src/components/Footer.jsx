import styled from "styled-components";
import { FacebookOutlined } from "@ant-design/icons";
import { InstagramOutlined } from "@ant-design/icons";
import { TwitterOutlined } from "@ant-design/icons";
import { WeiboOutlined } from "@ant-design/icons";
import { EnvironmentOutlined } from "@ant-design/icons";
import { PhoneOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";

const Container = styled.div`
  display: flex;
  background-color: #000000;
  margin-top: 60px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  color: white;
  font-weight: bolder;
  font-size: 30px;
`;

const Desc = styled.p`
  color: white;
  font-size: 15px;
  margin: 10px 0px;
  width: 70%;
  text-align: justify;
`;

const SocialContainer = styled.div`
  display: flex;
  color: white;
`;

const SocialIcon = styled.div`
  color: white;
  font-size: 30px;
  margin: 12px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  color: white;
  margin-bottom: 30px;
  font-weight: bolder;
`;

const List = styled.ul`
  color: white;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 15px;
  font-size: 16px;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  color: white;
  font-size: 16px;
  letter-spacing: 2px;
  margin-bottom: 15px;
`;

const Payment = styled.img``;
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Emart</Logo>
        <Desc>
          ‘Emart’ – Footwear for Everyone For each one of those shoe sweethearts
          out there, ‘Emart’ offer the one-stop goal to pick the correct match
          of footwear. To satisfy the affection for shoes, we offer heaps of
          alternatives from driving footwear marks, all under one rooftop. Gone
          are the days when you needed to go from store to store to locate the
          correct style and size for yourself.
        </Desc>
        <SocialContainer>
          <SocialIcon>
            <FacebookOutlined />
          </SocialIcon>
          <SocialIcon>
            <InstagramOutlined />
          </SocialIcon>
          <SocialIcon>
            <TwitterOutlined />
          </SocialIcon>
          <SocialIcon>
            <WeiboOutlined />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Men's</ListItem>
          <ListItem>Women's</ListItem>
          <ListItem>Shopping Cart</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <EnvironmentOutlined
            style={{ fontSize: "17px", fontWeight: "bolder" }}
          />
          2727 Valentine St, Huntington Beach California 92647
        </ContactItem>
        <ContactItem>
          <PhoneOutlined />
          +1 800 123 4567
        </ContactItem>
        <ContactItem>
          <MailOutlined />
          contact123@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};
export default Footer;
