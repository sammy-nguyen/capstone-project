const jwt = require("jsonwebtoken");
const secret = "asdfghjkl";

module.exports = function (app, client) {
  app.get("/products", (req, res) => {
    const { gender } = req.query;

    if (gender === "men" || gender === "women") {
      client
        .query(`select * from product where gender = '${gender}'`)
        .then((dataRes) => {
          return res.json(dataRes.rows);
        });
    } else {
      client.query("select * from product").then((dataRes) => {
        return res.json(dataRes.rows);
      });
    }
  });

  app.get("/products/search", (req, res) => {
    const { searchTerm } = req.query;

    console.log({ searchTerm });
    client
      .query(
        `select * from product where lower(product_name) like lower('%${searchTerm}%') or lower(gender) like lower('${searchTerm}%')`
      )
      .then((dataRes) => {
        console.log(dataRes);
        return res.json(dataRes.rows);
      })
      .catch((err) => {
        console.log("err", err);
        return res.status(500).send(err);
      });
  });

  app.get("/products/history", (req, res) => {
    const { token, total_price, products } = req.body;
    const user = jwt.verify(token, secret);
    client
      .query(
        `insert into orders(customer_id, total_price) values (${user.id}, ${total_price}) returning *`
      )
      .then((dataRes) => {
        // console.log(dataRes);
        for (let i = 0; i < products.length; i++) {
          client.query(
            `insert into order_product(quantity, customer_id, product_id, order_id) values (1,${user.id}, ${products[i].product_id},${dataRes.rows[0].id})`
          );
        }
        return res.status(200).send(dataRes.rows[0]);
      })
      .catch((err) => {
        console.log("err", err);
        return res.status(500).send(err);
      });
  });

  app.get("/products/purchased-history", (req, res) => {
    const { customer_id } = req.query;
    client
      .query(`select * from orders where customer_id = ${customer_id}`)
      .then((dataRes) => {
        console.log(dataRes);
        return res.status(200).send(dataRes.rows);
      })
      .catch((err) => {
        console.log("err", err);
        return res.status(500).send(err);
      });
  });
};
