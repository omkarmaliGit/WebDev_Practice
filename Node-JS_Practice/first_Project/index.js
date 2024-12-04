const express = require("express");
const app = express();

const PORT = 3000;

app.get("/admin/", (req, res) => {
  console.log({ request: req });
  res.send("Admin!!!");
});

app.get("/user/", (req, res) => {
  console.log({ request: req });
  res.send("User Omkar!!!");
});

app.listen(PORT, () => {
  console.log(`Listening to the ${PORT} at http://localhost:${PORT}`);
});
