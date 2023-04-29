import React, { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { inputFields, checkBox } from "./data.js";

const Form = ({ isSignin }) => {
  const [isSignIn, setIsSignIn] = useState(isSignin);
  const [loginSignUp, setLoginSignUp] = useState(true);
  const navigate = useNavigate();
  const toggle = (isLogin) => {
    isLogin === "register" ? setIsSignIn(false) : setIsSignIn(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", e.target.elements);
    const { username, password, repeatPassword, email, userType } =
      e.target.elements;
    const checkEmpty = isSignIn
      ? [username, password]
      : [username, password, repeatPassword, email];
    const isEmpty = checkEmpty.some((item) => item.value === "");
    if (isEmpty) {
      alert("Please fill all the fields");
    } else {
      if (!isSignIn && password.value !== repeatPassword.value) {
        alert("Password does not match");
      } else if (!isSignIn) {
        const appendDataInLocalStorage = () => {
          const user = {
            username: username.value,
            password: password.value,
            email: email.value,
            userType: userType.value,
          };
          const users = JSON.parse(localStorage.getItem("users")) || [];
          const isUserExist = users.some(
            (item) => item.username === username.value
          );
          if (isUserExist) {
            alert("User already exist");
          } else {
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            navigate("/login");
          }
        };
        appendDataInLocalStorage();
      } else {
        const checkUser = () => {
          const users = JSON.parse(localStorage.getItem("users")) || [];
          const isUserExist = users.some(
            (item) =>
              item.username === username.value &&
              item.password === password.value
          );
          if (isUserExist) {
            const user = users.find(
              (item) =>
                item.username === username.value &&
                item.password === password.value
            );
            alert("Logged in successfully");
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
          } else {
            alert("Invalid username or password");
          }
        };
        checkUser();
      }
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="w-3/4 pt-8 pb-8 mt-8 mx-auto border rounded-lg drop-shadow">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font  text-red-500">
              Hostel Owner Registration
            </h1>
          </div>
          <div className="lg:w-3/4 md:w-2/3 mx-auto">
            <form className=" mx-auto space-y-4 ">
              <div className="flex flex-wrap -m-2">
                {inputFields.map(({ label, type, id, name }) => (
                  <div className="p-2 w-1/3">
                    <div className="relative">
                      <label
                        for="name"
                        className="leading-7 text-sm text-gray-600"
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        id={id}
                        name={name}
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                ))}
                <div className="    p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Hostel :
                    </label>

                    <div className="flex  items-center mt-3 pt-1">
                      {checkBox.map((inputField, index) => (
                        <div className="flex  mx-4 w-[50px]" key={index}>
                          <input
                            type="radio"
                            name="gender"
                            value={inputField.label}
                          />
                          <label className=" font-bold mx-2">
                            {inputField.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-2 w-full">
                  <button className="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Form;
