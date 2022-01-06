import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { FileDoneOutlined } from "@ant-design/icons";
import axios from "axios";

const Container = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  margin-bottom: 240px;
`;

const Purchased = (props) => {
  const [orders, setOrders] = useState([]);
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

  const history = orders.map((order) => {
    return (
      <div>
        <h2>
          <span style={{ fontWeight: "bolder" }}>
            Order Confirmation Number:
          </span>
          {order.id}
        </h2>
        <div>
          <h2>
            <span style={{ fontWeight: "bolder" }}>Total:</span>
            {order.total_price}{" "}
          </h2>
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
