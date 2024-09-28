import React, { useState, useEffect } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, register } from "../../actions/userAction";
import "./SignUp.css";
import { useAlert } from "react-alert";

function SignUp() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { name, email, password } = user;
  const { error } = useSelector((state) => state.user);
  const registerSubmit = (e) => {
    e.preventDefault();
    dispatch(register(user));
    alert.success("Registered Successfully");
    nevigate("/");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ clearErrors });
    }
  }, [dispatch, error, alert]);
  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="LoginSignUpContainer">
        <form
          className="signUpForm"
          encType="multipart/form-data"
          onSubmit={registerSubmit}
        >
          <h2 className="r">Register</h2>
          <div className="signUpName">
            <FaceIcon />
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={registerDataChange}
            />
          </div>
          <div className="signUpEmail">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={registerDataChange}
            />
          </div>
          <div className="signUpPassword">
            <LockOpenIcon />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={registerDataChange}
            />
          </div>
          {/* <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div> */}
          <input type="submit" value="Register" className="signUpBtn" />
        </form>
      </div>
    </>
  );
}

export default SignUp;
