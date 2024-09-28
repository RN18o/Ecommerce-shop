import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
// import axios from "axios";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.Cart);
  const { user } = useSelector((state) => state.user);
  // const { error } = useSelector((state) => state.newOrder);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = async () => {
    try {
      const orderData = await fetch(
        "http://localhost:5000/api/v1/payment/process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ totalPrice }),
        }
      ).then((res) => res.json());

      const options = {
        key: "rzp_test_FGSCMbjc9iYZ1q", // Enter the Key ID generated from the Dashboard
        amount: orderData.amount,
        currency: "INR",
        name: "Ecommerce",
        description: "Test Transaction",
        order_id: orderData.id,
        handler: function (response) {
          // Handle successful payment here
          console.log("Payment Response:", response);
          // Optionally send payment info to your server
          fetch("http://localhost:5000/api/v1/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-razorpay-signature": response.razorpay_signature,
            },
            body: JSON.stringify(response),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "success") {
                alert("Payment Successful!");
                navigate("/order/success");
              } else {
                alert("Payment Verification Failed.");
              }
            });
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNo,
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <Fragment>
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      ₹{item.price} = <b>₹{item.price}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
      {/* <div className="orderSummary">
        <button onClick={proceedToPayment}>Proceed To Payment</button>
      </div> */}
    </Fragment>
  );
};

export default ConfirmOrder;
