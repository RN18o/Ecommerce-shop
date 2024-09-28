const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Route imports
console.log(" --------------- in app.js -----------------");
const product = require("./routes/productRouts");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
app.use("/check", async (req, res) => {
  console.log("welcome   ----------- ");
  res.send({ success: "You are welcome" });
});
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Middleware for error
// app.use(errorMiddleware);

module.exports = app;
