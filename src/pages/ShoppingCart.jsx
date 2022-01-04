// import React , { useState, useEffect} from "react";
// import axios from 'axios'
// import {useParams} from "react-router";
import Cart from "../components/Cart";

const ShoppingCart = (props) => {
  return (
    <div>
      <Cart
        cartArray={props.cartArray}
        updateCartArray={props.updateCartArray}
        isModalVisible={props.isModalVisible}
        setIsModalVisible={props.setIsModalVisible}
      />
    </div>
  );
};

export default ShoppingCart;
