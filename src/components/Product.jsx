import styled from "styled-components";
// import { Button } from 'antd';
import { Card } from 'antd';

const { Meta } = Card;


const Container = styled.div`
  display:flex;
  display: inline-block;
  // flex:1;
  // align-items: space-between;
  // justify-content: space-around;
  margin:40px;
`
const Button = styled.button`
  display: inline-block;
  padding: 3px 10px;
  margin:5px;
  color: black;
  font-weight: bolder;
  border: 1px solid black;
  background-color: white;
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: inset 0 0 0 0 #5c6b73;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
  &:hover{
  box-shadow: inset 0 0 0 50px  #253237;
  color: white;
`
const Product = (props) => {
  return(
    <Container>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="shoe-images" src={props.image} />}>
        <Meta title={props.product_name} description={`$${props.price}`} />

      <Button>View</Button><Button>Add to Cart</Button>
      </Card>
    </Container>
  )
}


export default Product
