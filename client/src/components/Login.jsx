import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API_LOGIN } from "../services/account/login.api.js";
import { useNavigate } from "react-router-dom";
import Header from "./partials/Header.jsx";
const Login = () => {
  const navigation = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  }, [navigation]);

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(form);
    const result = await API_LOGIN(form);
    console.log(result);
    if (result.status === 200) {
      console.log("OK");
      if (result.data.status === 200) {
        console.log("OK");
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
      }

      if (result.data.status === 201) {
        setErrors(result.data.data);
        return;
      }

      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    }
  };

  console.log(errors);

  return (
    <>
      <Header />
      <div className="container">
        <ToastContainer />
        <div className="row justify-content-center mt-4">
          <div className="col-lg-5 card border-primary mt-4">
            <div className="card-body">
              <h4 className="card-title">Login Now</h4>
              <div>
                <label htmlFor="user" className="form-label mt-4">
                  Email or Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  name="username"
                  id="user"
                  aria-describedby="emailHelp"
                  autoComplete="false"
                  placeholder="Enter email or username"
                />
                {errors?.username && (
                  <small id="emailHelp" className="form-text text-muted">
                    {errors.username.msg}
                  </small>
                )}
              </div>

              <div>
                <label htmlFor="pass" className="form-label mt-4">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  onChange={handleChange}
                  name="password"
                  id="pass"
                  aria-describedby="emailHelp"
                  autoComplete="false"
                  placeholder="Enter Password"
                />

                {errors?.password && (
                  <small id="emailHelp" className="form-text text-muted">
                    {errors.password.msg}
                  </small>
                )}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mt-4"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
