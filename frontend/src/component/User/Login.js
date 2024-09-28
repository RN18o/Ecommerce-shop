import React, { Fragment, useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const nevigate = useNavigate();
  // const location = useLocation();

  const { error, isAuthenticated } = useSelector((state) => state.user);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  // const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      // localStorage.setItem("token");
      alert.success("Logging Successfully");
      nevigate("/");
    } else {
      alert.success("Invalid Credencials");
    }
  }, [dispatch, error, alert, nevigate, isAuthenticated]);
  return (
    <Fragment>
      <div className="Login">
        <form className="loginForm" onSubmit={loginSubmit}>
          <h2 className="log">Login</h2>
          <div className="loginEmail">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="loginPassword">
            <LockOpenIcon />
            <input
              type="password"
              placeholder="Password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <Link className="pass" to="/password/forgot">
            Forget Password ?
          </Link>
          <input type="submit" value="Login" className="loginBtn" />
          <p className="do">Don't Have Account</p>
          <Link className="reg" to="/register">
            Register
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

export default LoginSignUp;
