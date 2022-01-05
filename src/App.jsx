import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import PurchasedHistory from "./pages/PurchasedHistory";
import ShoppingCart from "./pages/ShoppingCart";
import AccountPage from "./pages/AccountPage";
import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";
import { Modal, Button, Input } from "antd";
import { MailOutlined, KeyOutlined, UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function App() {
  const [cartArray, setCartArray] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [token, setToken] = useState("");

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateUser = () => {
    axios
      .post("http://localhost:8089/user/create", { name, email, password })
      .then(() => {
        Modal.success({
          content: "Your account has been created successfully.",
        });
        setMode("login");
      })
      .catch((err) => {
        Modal.error({
          title: "Something wrong",
          content: "Please try again later",
        });
      });
  };

  const handleLoginUser = () => {
    axios
      .post("http://localhost:8089/user/login", { email, password })
      .then((response) => {
        console.log(response);
        setUser(response.data.user);
        setToken(response.data.token);
        setIsModalVisible(false);
      })
      .catch((err) => {
        Modal.error({
          title: "Something wrong",
          content: "Please try again later",
        });
      });
  };

  const loginButton = [
    <Button onClick={() => setMode("create")}>Create an Account</Button>,
    <Button type="primary" onClick={handleLoginUser}>
      Login
    </Button>,
  ];

  const createButton = [
    <Button onClick={() => setMode("login")}>Cancel</Button>,
    <Button type="primary" onClick={handleCreateUser}>
      Register
    </Button>,
  ];

  return (
    <div className="App">
      <Modal
        title="Welcome to Emart"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        footer={mode === "login" ? loginButton : createButton}
      >
        {mode === "create" && (
          <Input
            prefix={<UserOutlined />}
            size="large"
            placeholder="Name"
            style={{ marginBottom: "10px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <Input
          size="large"
          placeholder="Email"
          prefix={<MailOutlined />}
          style={{ marginBottom: "10px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input.Password
          prefix={<KeyOutlined />}
          size="large"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Modal>
      <Announcement />
      <Navbar
        cartCount={cartArray.length}
        updateProducts={setProducts}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        user={user}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products/:gender"
          element={
            <ProductPage
              cartArray={cartArray}
              updateCartArray={setCartArray}
              products={products}
              updateProducts={setProducts}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <ShoppingCart
              cartArray={cartArray}
              updateCartArray={setCartArray}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              token={token}
            />
          }
        />
        <Route path="/user-account" element={<AccountPage />} />
        <Route path="/purchased" element={<PurchasedHistory />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
