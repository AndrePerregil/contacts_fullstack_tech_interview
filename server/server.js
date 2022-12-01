const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({ data: { name: "Andre" } });
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
