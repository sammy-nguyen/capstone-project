const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "asdfghjkl";

module.exports = function (app, client) {
  //CREATE USE/ CREATE ACCOUNT
  app.post("/user/create", (req, res) => {
    const { name, email, password } = req.body;
    //client.query("select email from Customer where email = $1", [email]); (line 28 = 29)
    // client.query(`select email from Customer where email = '${email}'`)

    client
      //.query(`insert into customer (name, email, password) values ('${name}', '${email}', '${password}')`)(line 34 = 35)
      .query(`select email from customer where email = '${email}'`)

      .then((dbResponse) => {
        if (dbResponse.rows.length > 0) {
          return res.status(200).send({ message: "Account already existed" });
        }

        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            console.error(err);
            return res.status(500).send({ message: "create password failed" });
          }

          client
            .query(
              `insert into customer (name, email, password) values ('${name}', '${email}', '${hash}')`
            )
            .then(() => {
              res
                .status(200)
                .send({ message: "account is created successfully" });
            })
            .catch((err) => {
              res.status(500).send({ message: "create account failed" });
            });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  });

  //LOGIN/ GET USER

  app.post("/user/login", (req, res) => {
    const { email, password } = req.body;
    client
      .query(`select * from customer where email = '${email}'`)
      .then((dbResponse) => {
        if (dbResponse.rows.length === 0) {
          return res
            .status(200)
            .send({ message: "your email or password is incorrect" });
        }
        console.log("password", password);
        console.log("dbResponse.rows[0]", dbResponse.rows[0]);
        bcrypt.compare(password, dbResponse.rows[0].password, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send({ message: "login failed" });
          }

          if (result) {
            const token = jwt.sign(
              {
                id: dbResponse.rows[0].customer_id,
                name: dbResponse.rows[0].name,
                email: dbResponse.rows[0].email,
              },
              secret,
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).send({
              message: "login successful",
              token,
              user: {
                id: dbResponse.rows[0].customer_id,
                name: dbResponse.rows[0].name,
                email: dbResponse.rows[0].email,
              },
            });
          }
          return res
            .status(403)
            .send({ message: "your email od password is incorrect" });
        });
      });
  });

  app.get("/user/info", (req, res) => {
    if (!req.query.token) {
      return res.status(403).send({ message: "missing or wrong token" });
    }
    console.log(">>>token", req.query.token);
    const user = jwt.verify(req.query.token, secret);
    if (!user) {
      return res.status(403).send({ message: "missing or wrong token" });
    }
    return res.status(200).send(user);
  });
};
