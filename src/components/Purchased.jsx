import styled from "styled-components";
import { Modal, Button, Space } from "antd";
import React, { useState, useEffect } from "react";
import { FileDoneOutlined, HeartTwoTone } from "@ant-design/icons";
import axios from "axios";

const Container = styled.div`
  margin-top: 30px;
  margin-left: 30px;
`;
const Wrapper = styled.div``;
const Left = styled.div``;
const Image = styled.img`
  height: 220px;
  width: 180px;
`;
const Right = styled.div``;

const Purchased = (props) => {
  const [orders, setOrders] = useState([]);
  const [detailProducts, setDetailProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8089/products/purchased-history?customer_id=${props.user.id}`
      )
      .then((res) => {
        setOrders(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.user.id]);

  const handleDetails = (order_id) => {
    axios
      .get(`http://localhost:8089/products/order-history?order_id=${order_id}`)
      .then((res) => {
        setDetailProducts(res.data);
        const informations = res.data.map((info) => {
          return (
            <Wrapper>
              <Left>
                <Image alt="shoe-images" src={info.image} />
              </Left>
              <Right>
                <p
                  style={{
                    fontWeight: "bold",
                    paddingRight: "10px",
                    letterSpacing: "2px",
                    marginTop: "10px",
                  }}
                >
                  {info.product_name}
                </p>
                <p
                  style={{
                    letterSpacing: "2px",
                    color: "#ff477e",
                  }}
                >
                  ${info.price}
                </p>
              </Right>
            </Wrapper>
          );
        });
        Modal.info({
          title: "Purchased Products",
          content: <div>{informations}</div>,
          onOk() {},
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const history = orders.map((order) => {
    return (
      <div>
        <h2>
          <HeartTwoTone twoToneColor="#eb2f96" />
          <span
            style={{
              fontWeight: "bolder",
              paddingRight: "10px",
              letterSpacing: "2px",
              marginLeft: "10px",
            }}
          >
            Order Confirmation Number:
          </span>
          #{order.id}
        </h2>
        <div>
          <h2>
            <span
              style={{
                fontWeight: "bolder",
                paddingRight: "10px",
                letterSpacing: "2px",
              }}
            >
              Total:
            </span>
            ${order.total_price}
          </h2>
          <Button
            style={{ marginBottom: "50px", outlineColor: "red" }}
            onClick={() => handleDetails(order.id)}
          >
            Details
          </Button>
        </div>
      </div>
    );
  });
  return (
    <Container>
      <div>
        <h1>
          Order Receipt <FileDoneOutlined />
        </h1>
      </div>
      <div>{history}</div>
    </Container>
  );
};

export default Purchased;
