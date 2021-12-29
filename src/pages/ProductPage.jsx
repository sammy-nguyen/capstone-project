import React , { useState, useEffect} from "react";
import axios from 'axios'
import {useParams} from "react-router";

import Product from "../components/Product";


const ProductPage = () => {
  const{ gender }= useParams();
  const [products, setProducts] = useState([])
  useEffect(() => {
  if(gender === "women"){
    axios.get('http://localhost:8089/products?gender=women')
      .then(res => {
        setProducts(res.data)
        console.log(res.query)
      })
      .catch(err => {
        console.log(err)
      })
  }else if( gender === "men"){
    axios.get('http://localhost:8089/products?gender=men')
      .then(res => {
        setProducts(res.data)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }else{
      axios.get('http://localhost:8089/products')
      .then(res => {
        setProducts(res.data)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }



  }, [])

  const cards = products.map((product) => {
    return <Product image={product.image} product_name={product.product_name} price={product.price} gender={product.gender} id={product.product_id}/>

  })
  return (
    <div>
     {cards}
    </div>
  );
};

export default ProductPage;
