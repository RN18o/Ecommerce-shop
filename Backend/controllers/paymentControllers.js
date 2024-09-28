// // const Payment = require("../models/paymentModel");
// const Razorpay = require("razorpay");
// const dotenv = require("dotenv");

// dotenv.config();

// const razorpay = new Razorpay({
//   key_id: "rzp_test_FGSCMbjc9iYZ1q",
//   key_secret: "cqrAR6aDXVElHdJocdcdLApk",
// });

// // For Checkout
// exports.checkout = async (req, res) => {
//   var options = {
//     amount: req.body.totalprice * 100, // amount in the smallest currency unit
//     currency: "INR",
//   };

//   const order = await razorpay.orders.create(options);

//   res.json({
//     // orderId: order.id,
//     // amount: amount,
//     // cartItems,
//     // userShipping,c
//     // userId,
//     // payStatus: "created",
//     success: true,
//     order,
//   });
// };

// server.js or routes/payment.js

// const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_FGSCMbjc9iYZ1q",
  key_secret: "cqrAR6aDXVElHdJocdcdLApk",
});

exports.checkout = async (req, res) => {
  const options = {
    amount: req.body.totalPrice * 100, // amount in paise
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add endpoint to verify payment
exports.paymentVerification = (req, res) => {
  const secret = "cqrAR6aDXVElHdJocdcdLApk";
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    res.json({ status: "success" });
  } else {
    res.status(400).json({ status: "failure" });
  }
};
