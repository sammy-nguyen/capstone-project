import styled from "styled-components";
import {Link} from "react-router-dom"

const Container = styled.div`
  display:flex;
  width: 100%;
`;

const Men = styled.div`
  flex: 1;

`
const Image = styled.img`
  margin-top: 2%;
  padding: 5px;
  position: absolute;
  height: 100%;
  width: 50%;



`
const Button = styled.button`
  position: relative;
  margin-top: 90%;
  margin-left: 45%;
  color: white;
  font-weight: bolder;
  border: 3px solid white;
  box-shadow: white 3px;
  background-color: transparent;
  border-radius: 0px;
  padding: 18px 70px;
  font-size: 18px;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: inset 0 0 0 0 #D80286;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
  &:hover{
  box-shadow: inset 0 100px 0 0 #177e89;
  color: white;
  }
}

`
const Women = styled.div`
  flex: 1;
`
const Gender = () => {
  return (
    <Container>
      <Men>
        <Image src={`https://images.unsplash.com/photo-1605737804470-0d611b7b827c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80`}/>
        <Link to="/products/men">
              <Button>MEN</Button>
        </Link>
      </Men>
      <Women>
        <Image src={`https://images.unsplash.com/photo-1565021861162-e2a8c7e817e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80`}/>
        <Link to="/products/women">
              <Button>WOMEN</Button>
        </Link>
      </Women>

    </Container>
  );
};
export default Gender;
