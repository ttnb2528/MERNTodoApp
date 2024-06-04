import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API_REGISTER } from "../services/account/register.api.js";
import { useNavigate } from "react-router-dom";
import Header from "./partials/Header.jsx";

const Register = () => {
  const navigation = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  }, [navigation]);

  const handleSubmit = async () => {
    console.log(form);
    const result = await API_REGISTER(form);
    console.log(result);
    if (result.status === 200) {
      if (result.data.status === 201) {
        setErrors(result.data.data);
        toast(result.data.message);
        return;
      }

      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }

      if (result.data.status === 202) {
        toast(result.data.message);
        navigation("/login");
        return;
      }
    }
  };
  return (
    <>
      <Header />
      <div className="container">
        <ToastContainer />
        <div className="row justify-content-md-center mt-4">
          <div className="col-lg-5 card border-primary mb-3">
            <div className="card-header h4 text-center">
              Register An Account
            </div>

            <div className="card-body">
              <div className="from-group">
                <label className="col-form-label mt-4">Name</label>
                <input
                  name="name"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                />

                {errors?.name && (
                  <small id="emailHelp" className="form-text text-danger">
                    {errors.name.msg}
                  </small>
                )}
              </div>

              <div className="from-group">
                <label className="col-form-label mt-4">Username</label>
                <input
                  name="username"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                />

                {errors?.username && (
                  <small id="emailHelp" className="form-text text-danger">
                    {errors.username.msg}
                  </small>
                )}
              </div>

              <div className="from-group">
                <label className="col-form-label mt-4">Email</label>
                <input
                  name="email"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Email"
                />

                {errors?.email && (
                  <small id="emailHelp" className="form-text text-danger">
                    {errors.email.msg}
                  </small>
                )}
              </div>

              <div className="from-group">
                <label className="col-form-label mt-4">Password</label>
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  className="form-control"
                  placeholder="Enter Your Password"
                />

                {errors?.password && (
                  <small id="emailHelp" className="form-text text-danger">
                    {errors.password.msg}
                  </small>
                )}
              </div>

              <div className="row justify-content-md-center from-group mt-4">
                <button
                  onClick={handleSubmit}
                  className="col-sm-6 btn btn-outline-secondary center"
                  type="button"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
