import { Pool } from "pg";

const connection = new Pool({
  host: "localhost",
  user: "irfanarrosid",
  password: "at19ir97ar",
  database: "lyrid_ems",
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
});

export default connection;
