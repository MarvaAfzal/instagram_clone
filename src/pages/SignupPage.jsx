import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {signUp, clearError } from "../redux/authSlice";
import Signup from "../components/Signup/Signup";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isSignedUp , error, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
     console.log("Submitting form data:", formData);
    dispatch(signUp(formData));
  };

  useEffect(() => {
    if (isSignedUp) {
      navigate("/login"); // Redirect to feed after successful signup
    }
  }, [isSignedUp, navigate]);

  return (
    <Signup
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
      loading={loading}
    />
  );
};

export default SignupPage;
