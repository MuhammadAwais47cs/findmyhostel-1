import React from "react";
import bgImg from "../../assets/bgImg.jpg";
import Form from "../../modules/Form";
import ReactDOM from "react-dom";

const Modal = ({
  closeModel,
  children,
  tag = "Farm",
  title = "Luxury Apartment ocean view",
  address = "153 Adriniana Mews Suite 247",
  image = "",
  features = {
    beds: 4,
    bath: 2,
    sqft: 2100,
  },
  price = 12340,
  agent = {
    name: "Eleneor French",
    date: "2 Days ago",
  },
}) => {
  return ReactDOM.createPortal(
    <>
      <div
        className="backdrop-blur-sm bg-white/30 fixed inset-0"
        onClick={closeModel}
      ></div>
      <div className="flex justify-center items-center z-10   rounded-md drop-shadow-lg mb-12 fixed top-0 left-1/4 translate-x-1/2">
        {children}
      </div>
    </>,
    document.querySelector(".customModels")
  );
};

export default Modal;
