import React, { useState } from "react";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { ShoppingOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-item: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
`;
const Language = styled.span`
  font-size: 16px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  margin-top: 12px;
  padding: 5px;
  height: 34px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 35px;
  letter-spacing: 2px;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
`;

const MenuItem = styled.div`
  font-size: 16px;
  cursor: pointer;
  margin-left: 25px;
`;

const HomeBtn = styled.div`
  font-size: 16px;
  cursor: pointer;
  margin-left: 25px;
  color: black;
`;
const Navbar = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const searchFeature = () => {
    axios
      .get(`http://localhost:8089/products/search?searchTerm=${searchInput}`)
      .then((res) => {
        props.updateProducts(res.data);
        setSearchInput("");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  searchFeature();
                }
              }}
            />
            <SearchOutlined
              onClick={searchFeature}
              style={{ color: "gray", fontSize: 16 }}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/">
            <Logo>Emart</Logo>
          </Link>
        </Center>
        <Right>
          <Link to="/">
            <HomeBtn>HOME</HomeBtn>
          </Link>

          {props.user ? (
            <Link to="/purchased">
              <MenuItem style={{ fontSize: "20px" }}>
                Hello, {props.user.name}
              </MenuItem>
            </Link>
          ) : (
            <MenuItem
              onClick={() => props.setIsModalVisible(!props.isModalVisible)}
            >
              SIGN IN
            </MenuItem>
          )}

          <Link to="/cart">
            <MenuItem>
              <Badge color="#f20089" count={props.cartCount} size="large">
                <ShoppingOutlined style={{ fontSize: "30px" }} />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
