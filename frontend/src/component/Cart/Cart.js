import React, { Fragment } from "react";
import "./Cart.css";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.Cart);

  // const increaseQuantity = (id) => {
  //   // const newQty = quantity + 1;
  //   // if (stock <= quantity) {
  //   //   return;
  //   // }
  //   dispatch(addItemsToCart(id));
  // };

  // const decreaseQuantity = (id) => {
  //   // const newQty = quantity - 1;
  //   // if (1 >= quantity) {
  //   //   return;
  //   // }
  //   dispatch(addItemsToCart(id));
  // };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItem item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    {/* <button onClick={() => decreaseQuantity(item.product)}>
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly /> */}
                    {/* <button
                      onClick={() => increaseQuantity(item.product, item.stock)}
                    >
                      +
                    </button> */}
                  </div>
                  <p className="cartSubtotal">{`₹${item.price}`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
