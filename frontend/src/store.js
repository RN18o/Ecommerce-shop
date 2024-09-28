import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  productDetailReducer,
  productReducer,
} from "./reducers/productReducers";
import {
  allUsersReducer,
  forgotPasswordReducer,
  userReducers,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import { newOrderReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
  products: productReducer,
  user: userReducers,
  forgotPassword: forgotPasswordReducer,
  ProductDetail: productDetailReducer,
  Cart: cartReducer,
  allusers: allUsersReducer,
  newProduct: newProductReducer,
  newOrder: newOrderReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
