const express = require("express");

const router = express.Router();

console.log("---------Payment--------");
// const { isAuthenticatedUser } = require("../middleware/auth");
const {
  checkout,
  paymentVerification,
} = require("../controllers/paymentControllers");

router.route("/payment/process").post(checkout);
router.route("/verify-payment").post(paymentVerification);

module.exports = router;
