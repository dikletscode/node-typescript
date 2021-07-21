import mysql from "mysql";

const sql = mysql.createConnection({
  host: "localhost",
  user: "music",
  database: "music_app",
  password: "Mamahmuda000",
});

sql.connect((err) => {
  if (err) console.log(err);
  console.log("database connected");
});

export default sql;
