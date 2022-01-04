const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userController = require("./controllers/userController");
const productController = require("./controllers/productController");

const app = express();
app.use(cors());
app.use(express.json());

//CLIENT (DATABASE) CONNECT TO BACK END SERVER BY URI
const { Client } = require("pg");
const client = new Client({
  connectionString:
    "postgres://siagndpzonqcdb:6cd944fb03f0990da66b3d9e7b9a6db5b2557b5f39685f4c729a3da449ffa47c@ec2-3-89-214-80.compute-1.amazonaws.com:5432/danq7m7i6f71vu",
  ssl: { rejectUnauthorized: false },
});

client
  .connect()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => console.log(err));

userController(app, client);
productController(app, client);

//GET PRODUCT

//DELETE PRODUCT

//UPDATE QUANTITY (INCREASE/ DECREASE)

const port = 8089;
app.listen(port, () => {
  console.log(`${port} is running`);
});
