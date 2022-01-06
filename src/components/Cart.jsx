// import React, { useState } from "react";
import { Card, Modal } from "antd";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { MinusCircleOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 50px;
  margin-bottom: 20px;
  margin-left: 50px;
  margin-right: 30px;
  padding: 10px;
`;
const WrapperOne = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // flex: 3;
`;
const WrapperTwo = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
  margin-left: 30px;
  .ant-card-head-title {
    font-size: 30px;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 250px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  padding-left: 50px;
  padding-top: 30px;
  color: blue;
  font-size: 30px;
  p {
    color: #3d405b;
  }
  span {
    color: #ff7aa2;
  }
`;

const CardStyle = styled.div`
  width: 60vw;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  flex: 3;
`;

const Quantity = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  p {
    color: #00a6a6;
  }
`;

const CardStyleTwo = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fb9bb7;
  padding: 10px 40px;
  font-size: 20px;
  cursor: pointer;
  margin-left: 95px;
  margin-top: 50px;
`;
const Cart = (props) => {
  const handleAddToCart = (product) => {
    props.updateCartArray([...props.cartArray, product]);
  };

  const handleSubtract = (product_id) => {
    const newArray = [...props.cartArray];
    const indexArr = newArray.findIndex(
      (product) => product.product_id === product_id
    );
    newArray.splice(indexArr, 1);
    props.updateCartArray(newArray);
  };

  const quantityNum = (id) => {
    return props.cartArray.filter((obj) => obj.product_id === id).length;
  };

  const subTotal = () => {
    let totalAmount = 0;
    props.cartArray.forEach((product) => {
      totalAmount += Number(product.price);
    });
    return totalAmount;
  };

  const uniqueCards = [
    ...props.cartArray
      .reduce((map, obj) => map.set(obj.product_id, obj), new Map())
      .values(),
  ];

  const removeItem = (product_id) => {
    let newArr = props.cartArray.filter((product) => {
      return product.product_id !== product_id;
    });
    props.updateCartArray(newArr);
  };

  const handleCheckout = () => {
    if (props.token.length === 0) {
      console.log("run here");
      props.setIsModalVisible(!props.isModalVisible);
    } else {
      const totalPrice = (subTotal() * (1.0725).toFixed(2)).toFixed(2);
      axios
        .post("http://localhost:8089/products/history", {
          token: props.token,
          total_price: totalPrice,
          products: props.cartArray,
        })
        .then(() => {
          Modal.success({ content: "Your order is completed" });
          props.updateCartArray([]);
        })
        .catch((err) => {
          console.error(err);
          Modal.error({
            title: "Something wrong",
            content: "Please try again later",
          });
        });
    }
  };

  const cards = uniqueCards.map((product, index) => {
    return (
      <Wrapper>
        <Card key={product.product_id}>
          <CardStyle>
            <Image alt="shoe-images" src={product.image} />

            <ProductInfo>
              <p>{product.product_name}</p>
              <span>${product.price}</span>
              <Quantity>
                <MinusCircleOutlined
                  onClick={() => handleSubtract(product.product_id)}
                  style={{
                    color: "black",
                    cursor: "pointer",
                    paddingTop: "15px",
                    fontSize: "35px",
                  }}
                />
                <p
                  style={{
                    fontSize: "40px",
                    paddingLeft: "20px",
                    color: "#00a6a6",
                    paddingRight: "20px",
                  }}
                >
                  {quantityNum(product.product_id)}
                </p>
                <PlusCircleOutlined
                  onClick={() => handleAddToCart(product)}
                  style={{
                    color: "black",
                    cursor: "pointer",
                    paddingTop: "15px",
                    fontSize: "35px",
                  }}
                />
              </Quantity>
            </ProductInfo>
            <DeleteOutlined
              style={{
                color: "#bfbfbf",
                cursor: "pointer",
                fontSize: "30px",
              }}
              onClick={() => removeItem(product.product_id)}
            />
          </CardStyle>
        </Card>
      </Wrapper>
    );
  });

  return (
    <Container>
      {props.cartArray.length === 0 ? (
        <p style={{ fontSize: "70px", margin: "10%", color: "#706677" }}>
          Your cart is empty
        </p>
      ) : (
        ""
      )}

      <WrapperOne>{cards}</WrapperOne>
      {props.cartArray.length > 0 ? (
        <WrapperTwo>
          <Card title="Order Summary" style={{ width: "500px" }}>
            <CardStyleTwo>
              <p style={{ fontSize: "25px" }}>
                Subtotal:
                <span style={{ paddingLeft: "300px" }}>${subTotal()}</span>
              </p>
              <p style={{ fontSize: "25px" }}>
                Shipping:<span style={{ paddingLeft: "300px" }}>FREE</span>
              </p>
              <p style={{ fontSize: "25px" }}>
                Tax:{" "}
                <span style={{ paddingLeft: "315px" }}>
                  ${(subTotal() * (1.0725).toFixed(2) - subTotal()).toFixed(2)}
                </span>
              </p>
              <p style={{ fontSize: "30px", color: "#00a6a6" }}>
                TOTAL:{" "}
                <span style={{ paddingLeft: "230px" }}>
                  ${(subTotal() * (1.0725).toFixed(2)).toFixed(2)}
                </span>
              </p>
            </CardStyleTwo>
            <Button onClick={handleCheckout}>Proceed to Checkout</Button>
          </Card>
        </WrapperTwo>
      ) : null}
    </Container>
  );
};
export default Cart;
