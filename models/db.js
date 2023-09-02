import mysql from "mysql";

const connection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
});

export default connection;
