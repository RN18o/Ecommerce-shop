import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home/Home";
import Search from "./component/Product/Search";
import Login from "./component/User/Login";
import SignUp from "./component/User/SignUp";
import Forgotpassword from "./component/User/Forgotpassword";
import ResetPassword from "./component/User/ResetPassword";
import ProductDetail from "./component/Product/ProductDetail";
import product from "./component/Product/product";
import Profile from "./component/User/Profile";
import UserOptions from "./component/layout/Header/userOptions";
import { useSelector } from "react-redux";
//import ProtectedRoute from "./component/layout/ProtectedRoute";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Dashboard from "./component/Admin/Dashboard";
import Productlist from "./component/Admin/Productlist";
import OrderSuccess from "./component/Cart/OrderSuccess";
import NewProduct from "./component/Admin/NewProduct";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/Search" Component={Search} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/register" Component={SignUp} />
        <Route exact path="/products/:keyword" Component={product} />
        <Route exact path="/account" Component={Profile} />
        <Route exact path="/product/:id" Component={ProductDetail} />
        <Route exact path="/password/forgot" Component={Forgotpassword} />
        <Route exact path="/password/reset/:token" Component={ResetPassword} />
        <Route exact path="/cart" Component={Cart} />
        <Route exact path="/shipping" Component={Shipping} />
        <Route exact path="/order/confirm" Component={ConfirmOrder} />
        <Route exaxt path="/admin/dashboard" Component={Dashboard} />
        <Route exact path="/admin/products" Component={Productlist} />
        <Route exact path="/order/success" Component={OrderSuccess} />
        <Route exact path="/admin/product" Component={NewProduct} />
        {/* <ProtectedRoute exact path="/shipping" Component={Shipping} /> */}
        {/* <Route exact path="/shipping" Component={ProtectedRoute}>
          <Route exact path="/shipping" Component={Shipping} />
        </Route> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
