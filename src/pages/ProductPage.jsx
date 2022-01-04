import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Product from "../components/Product";
// import Cart from "../components/Cart";

const ProductPage = (props) => {
  const { gender } = useParams();

  useEffect(() => {
    if (gender === "women") {
      axios
        .get("http://localhost:8089/products?gender=women")
        .then((res) => {
          props.updateProducts(res.data);
          console.log(res.query);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (gender === "men") {
      axios
        .get("http://localhost:8089/products?gender=men")
        .then((res) => {
          props.updateProducts(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get("http://localhost:8089/products")
        .then((res) => {
          props.updateProducts(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [gender]);

  const cards = props.products.map((product) => {
    return (
      <Product
        // image={product.image}
        // product_name={product.product_name}
        // price={product.price}
        // gender={product.gender}
        // id={product.product_id}
        key={product.product_id}
        product={product}
        cartArray={props.cartArray}
        updateCartArray={props.updateCartArray}
      />
    );
  });
  return <div>{cards}</div>;
};

export default ProductPage;
