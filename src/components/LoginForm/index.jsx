import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      navigate("/api/dashboard", { replace: true });
    }
  }, [token, navigate]);

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
    setUsernameError("");
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("token", jwtToken, { expires: 30 });
    alert("Login Successful");
    navigate("/api/dashboard", { replace: true });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setIsLoading(true);
    try {
      const userDetails = { username, password };
      const url = "https://syncthreads-backend-project.onrender.com/api/login";
      const response = await axios.post(url, userDetails);
      console.log(response);
      if (response.status === 200) {
        const jwtToken = response.data.jwtToken;
        onSubmitSuccess(jwtToken);
      }
    } catch (error) {
      if (error.response) {
        setShowSubmitError(true);
        setErrorMsg(
          error?.response?.data?.error ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onBlurPassword = () => {
    if (!password.trim()) {
      setPasswordError("Password cannot be Empty");
    }
  };

  const onBlurUsername = () => {
    if (!username.trim()) {
      setUsernameError("Username cannot be Empty");
    }
  };

  const renderPasswordField = () => {
    return (
      <>
        <label
          className="mb-0 font-bold text-[12px] leading-[16px] text-[#475569]"
          htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="text-[14px] h-[40px] border border-[#d7dfe9] bg-[#e2e8f0] text-[#64748b] rounded-[2px] mt-[5px] py-2 px-4 shadow-gray-300"
          value={password}
          onChange={onChangePassword}
          onBlur={onBlurPassword}
          style={{
            backgroundColor: passwordError ? "#f8d7da" : "#e2e8f0",
          }}
        />
        {passwordError && (
          <p className="text-red-500 text-xs mt-1">{passwordError}</p>
        )}
      </>
    );
  };

  const renderUsernameField = () => {
    return (
      <>
        <label
          className="mb-0 font-bold text-[12px] leading-[16px] text-[#475569]"
          htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="text-[14px] h-[40px] border border-[#d7dfe9] bg-[#e2e8f0] text-[#64748b] rounded-[2px] mt-[5px] py-2 px-4 shadow-gray-300"
          value={username}
          onChange={onChangeUsername}
          onBlur={onBlurUsername}
          style={{
            backgroundColor: usernameError ? "#f8d7da" : "#e2e8f0",
          }}
        />
        {usernameError && (
          <p className="text-red-500 text-xs mt-1">{usernameError}</p>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-[90%] max-w-[1110px] m-auto lg:flex-row lg:justify-around">
      <img
        src="https://img.freepik.com/free-vector/vintage-world-map-cartography-concept_52683-26377.jpg"
        className="w-[165px] mt-[50px] mb-[35px] hidden"
        alt="website logo"
      />
      <img
        src="https://img.freepik.com/free-vector/vintage-world-map-cartography-concept_52683-26377.jpg?t=st=1742672346~exp=1742675946~hmac=1655af4329f5314e0abeb4432ec027e229e907d4111979875c952d40d1fd9423&w=1380"
        className="w-[278px] lg:w-[60%] lg:max-w-[524px] lg:shrink mr-[20px]"
        alt="website login"
      />
      <form
        className="flex flex-col items-center p-[20px] rounded-[8px] w-[100%] max-w-[350px] lg:w-[350px] lg:shrink-0 lg:shadow-md lg:p-16"
        onSubmit={onSubmitForm}>
        <img
          src="https://img.freepik.com/free-vector/gradient-quill-pen-design-template_23-2149837194.jpg?t=st=1742839138~exp=1742842738~hmac=b383b096afb819f2457f4630105dead42d06ce9fdd8cfb48ab71ddf850bcd38f&w=826"
          className="w-[120px] lg:block"
          alt="website logo"
        />
        <div className="flex flex-col mt-[20px] w-[100%]">
          {renderUsernameField()}
        </div>
        <div className="flex flex-col mt-[20px] w-[100%]">
          {renderPasswordField()}
        </div>
        <button
          type="submit"
          className="font-bold text-sm text-white h-10 w-full mt-5 mb-0.5 bg-blue-600 rounded-lg border-none"
          disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {showSubmitError && (
          <p className="self-start text-xs mt-1 mb-0 font-roboto leading-4 text-[#ff0b37]">
            *{errorMsg}
          </p>
        )}
        <p className="text-sm text-gray-600 mt-4">
          Don't have an account?
          <span
            className="text-blue-600 cursor-pointer ml-[5px]"
            onClick={() => navigate("/api/register")}>
            Sign up here
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
