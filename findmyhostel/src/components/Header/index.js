import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "../../modules/Form";
import Modal from "../Modal/index";

const Header = () => {
  const [showModel, setShowModel] = useState(false);
  const [loginSignUp, setLoginSignUp] = useState(true);
  const menus = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about-us",
    },
    {
      name: "Hostels",
      link: "/hostels",
    },
    {
      name: "Clients Testimonials",
      link: "/clients-testimonials",
    },
    {
      name: "Contact",
      link: "/contact-us",
    },
  ];

  const checkBox = [
    {
      label: "Boys",
    },
    {
      label: "Girls",
    },
  ];
  const navigate = useNavigate();
  const toggle = (isLogin) => {
    setShowModel(!showModel);
    isLogin === "register" ? setLoginSignUp(false) : setLoginSignUp(true);
  };
  return (
    <div>
      <div className=" h-8 w-screen bg-red-300 flex items-center px-16">
        <div className="mr-12">Call us: 0900393743</div>
        <div>Chat us: area.wa</div>
        <div className=" ml-auto">
          <span className=" cursor-pointer" onClick={() => toggle("login")}>
            Login
          </span>{" "}
          /{" "}
          <span className=" cursor-pointer" onClick={() => toggle("register")}>
            Register
          </span>
        </div>
      </div>
      <div className="bg-white shadow-sm py-6 px-16 flex items-center justify-between">
        <div className=" text-6xl text-red-900 font-medium">HBM</div>
        <div className="flex item-center justify-evenly">
          {menus.map((menu, index) => (
            <div
              className="text-red-900 text-xl font-semibold ml-6"
              key={index}
            >
              <Link to={menu.link}>{menu.name}</Link>
            </div>
          ))}
        </div>
        <div className="  flex justify-center items-center flex-wrap">
          <div>
            <label className="text-red-900 font-bold mx-2">Hostels :</label>
          </div>

          {checkBox.map((inputField, index) => (
            <div className="flex  mr-4 w-[50px]" key={index}>
              <input type="radio" name="gender" value={inputField.label} />
              <label className="text-red-900 font-bold mx-2">
                {inputField.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      {showModel && (
        <Modal closeModel={toggle}>
          <Form isSignin={loginSignUp ? true : false} />
        </Modal>
      )}
    </div>
  );
};

export default Header;
