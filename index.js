const express = require("express");
const app = express();
const { rootRouter } = require("./routers/root.routers");

app.use(express.json());
app.use("/api", rootRouter);

app.listen(3000, () => {
  console.log("app run on port 3000");
});
