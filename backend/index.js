import express from "express";
import mysql from "mysql2";
const port = 5000;
const app = express();

const mysqlConfig = {
  host: "mysql_server",
  user: "nazmul",
  password: "secret",
  database: "test_db",
};

let con = null;

app.get("/connect", function (req, res) {
  con = mysql.createConnection(mysqlConfig);
  con.connect(function (err) {
    if (err) res.send("Error");
    res.send("connected");
  });
});

app.get("/fetch", function (req, res) {
  con.connect(function (err) {
    if (err) throw err;
    const sql = `SELECT * FROM users`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result));
    });
  });
});

app.get("/", (req, res) => {
  res.send("<h3>How are you World?</h3>");
});

app.get("/data", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Nazmul Hosen",
      address: "Sherpur",
    },
    {
      id: 2,
      name: "Leyon Rayhan",
      address: "Nakla",
    },
    {
      id: 3,
      name: "Mahbub Rayan",
      address: "Mymensingh",
    },
    {
      id: 4,
      name: "Mahmudul Russel",
      address: "Fulpur",
    },
  ]);
});

// 404 ROUTE NOT FOUND
app.use((req, res, next) => {
  res.status(404).send("Sorry can't found this...");
});

app.use((err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: "Something went wrong!" });
  } else {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`listining on localhost:${port}`);
});
