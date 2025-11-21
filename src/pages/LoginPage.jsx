import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, clearError } from "../redux/authSlice";
import Login from "../components/Login/Login";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isSignedUp, error, loading } = useSelector((state) => state.auth);

  // Login form state
  const [credentials, setCredentials] = useState({
    emailOrusername: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login({
        emailOrusername: credentials.emailOrusername, // must match backend
        password: credentials.password,
      })
    );
  };

  // Redirect logic
  useEffect(() => {
    if (isLoggedIn) navigate("/feed"); // after successful login
    else if (isSignedUp) navigate("/login"); // after signup, go to login page
  }, [isLoggedIn, isSignedUp, navigate]);

  return (
    <Login
      credentials={credentials}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
      loading={loading}
    />
  );
};

export default LoginPage;
