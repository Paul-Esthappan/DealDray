import React, { useState } from "react";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../axios/axios";
import { useDispatch } from "react-redux";
import { setUserAndToken } from "../../redux/authSlice";
import Button from "../../components/Button/Button";

const Form = ({ isSignInPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    pwd: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));

    if (name === "pwd" && formData.confirmPassword) {
      setErrorMessage(
        value !== formData.confirmPassword ? "Passwords do not match" : ""
      );
    } else if (name === "confirmPassword" && formData.password) {
      setErrorMessage(
        value !== formData.password ? "Passwords do not match" : ""
      );
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await publicRequest.post(
        `${!isSignInPage ? "/auth/signup" : "/auth/signin"}`,
        formData
      );

      if (!isSignInPage) {
        const { user, token } = response.data;
         dispatch(setUserAndToken({ user, token }));
         navigate("/");
   

      } else {
        const { user, token } = response.data;
        dispatch(setUserAndToken({ user, token }));
        navigate('/')
      }

      // Clear form data on successful submission
      setFormData({
        userName: "",
        pwd: "",
      });
    } catch (error) {
      console.error(
        `${!isSignInPage ? "Signup" : "Login"} failed:`,error
      );
      setErrorMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#d2cfdf] h-screen w-screen flex justify-center items-center ">
      <div className="h-[700px] w-[1000px] bg-white flex  justify-center items-center md:flex-row scrollbar-hide">
        <div
          className={`${
            !isSignInPage ? "order-1" : "order-2 justify-center"
          } h-[700px] pt-20 w-full flex flex-col overflow-scroll items-center scrollbar-hide`}
        >
          <div>
            <h1 className="text-2xl font-serif font-bold text-red-600 justify-center">
              Welcome
            </h1>
          </div>
          <div>
            <h3 className="text-gray-600 text-sm ">
              {!isSignInPage
                ? "Please register to continue"
                : "Please login to continue."}
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              label="UserName"
              type="text"
              id="userName"
              name="userName"
              placeholder="UserName? ex:Roman Tino"
              value={formData.userName}
              onChange={handleInputChange}
            />
            <Input
              label="Password"
              name="pwd"
              type="password"
              placeholder="********"
              value={formData.pwd}
              onChange={handleInputChange}
            />
            {!isSignInPage ? (
              <div>
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    handleInputChange(e); // Trigger validation
                  }}
                />
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col justify-center items-center">
              <Button
                type="submit"
                className="p-2"
                label={isSignInPage ? "Login" : "Add Admin"}
                disabled={loading}
              />
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
          </form>
        </div>

        <div
          className={`flex  ${
            !isSignInPage ? "order-2" : "order-1"
          } border w-full h-full bg-gray-600 hidden md:block items-center justify-center my-auto`}
        >
          <img
            className="flex h-[50%] "
            src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.png"
            alt="Food Hunters"
          />
          <img
            className="flex h-[50%]"
            src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.png"
            alt="Food Hunters"
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
