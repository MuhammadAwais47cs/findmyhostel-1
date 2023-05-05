import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import bgImg from "../../assets/bgImg.jpg";
import Card from "../../components/Card";
import { data } from "./data";
import Footer from "../../components/Footer";

const Main = () => {
  const [showForm, setShowForm] = useState(false);
  const [hostels, setHostels] = useState([]);

  // useEffect(() => {
  //   const localStorageData = JSON.parse(localStorage.getItem("data")) || [];
  //   if (localStorageData.length === 0) {
  //     localStorage.setItem("data", JSON.stringify(data));
  //   }
  // }, [data]);

  useEffect(() => {
    const fetchHostels = async () => {
      const res = await fetch("http://localhost:8000/api/hostels");
      const data = await res.json();
      setHostels(data?.hostels);
    };
    fetchHostels();
  }, []);

  const inputFields = [
    {
      label: "Keyword",
      placeholder: "Search by name",
      name: "hostelName",
    },
    {
      label: "Location",
      placeholder: "Search by location",
      name: "hostelAddress",
    },
    {
      label: "City",
      placeholder: "Search by area",
      name: "city",
    },
    {
      label: "Hostel Type",
      placeholder: "Search by hostel type",
      name: "type",
    },
  ];
  const handleFind = async (e) => {
    e.preventDefault();
    console.log(e.target.elements, "e.target.elements");
    const fields = { hostelName, city, country, type };

    const fieldsData = Object.values(fields).reduce((acc, item) => {
      acc[item.name] = item.value;
      return acc;
    }, {});
    console.log("fieldsData", fieldsData);
    const { hostelName, city, country, type } = fieldsData;
    const res = await fetch(
      `http://localhost:8000//api/hostels/search?hostelName=${hostelName}&city=${city}&country=${country}&type=${type}`
    );
    // const res = await fetch('http://localhost:8000/api/hostels');
    const data = await res.json();
    setHostels(data?.hostels);
    if (!res.ok) {
      alert(`An error has occured: ${res.status}`);
    } else {
      alert("Hostel added successfully");
      document.getElementById("addHostelForm").reset();
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("submit", e.target.elements);
  //   const { tag, title, address, price, name, beds, bath, sqft, image } =
  //     e.target.elements;
  //   const checkEmpty = [tag, title, address, price, name];
  //   const isEmpty = checkEmpty.some((item) => item.value === "");
  //   if (isEmpty) {
  //     alert("Please fill all the fields");
  //   } else {
  //     const appendDataInLocalStorage = () => {
  //       const item = {
  //         tag: tag.value,
  //         title: title.value,
  //         address: address.value,
  //         price: price.value,
  //         image: image.value,
  //         agent: {
  //           name: name.value,
  //         },
  //         features: {
  //           beds: beds.value,
  //           bath: bath.value,
  //           sqft: sqft.value,
  //         },
  //       };
  //       const items = JSON.parse(localStorage.getItem("data")) || [];
  //       const isItemExist = items.some((item) => item.title === title.value);
  //       if (isItemExist) {
  //         alert("Hostel already exist");
  //       } else {
  //         items.push(item);
  //         data.push(item);
  //         localStorage.setItem("data", JSON.stringify(items));
  //         setShowForm(false);
  //       }
  //     };
  //     appendDataInLocalStorage();
  //   }
  // };

  return (
    <>
      {/* Background */}
      <div
        style={{ backgroundImage: `url(${bgImg})` }}
        className="bg-cover bg-center bg-no-repeat h-[600px]"
      ></div>

      {/* Input Fields Section */}
      <div
        className="drop-shadow-lg  mx-auto mb-[100px] py-20 max-w-[1440px] mt-[-100px]"
        style={{ backgroundColor: "#d3d3d38c" }}
      >
        <form
          className="flex justify-center items-center flex-wrap"
          onSubmit={(e) => handleFind(e)}
        >
          {inputFields.map((inputField, index) => (
            <div className="flex flex-col mr-4 w-[250px]" key={index}>
              <label className="text-red-900 font-bold">
                {inputField.label}
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 mt-2"
                placeholder={inputField.placeholder}
                name={inputField.name}
              />
            </div>
          ))}
          <button className="bg-red-500 text-white p-2 rounded-md ml-4 mt-8 z-10 w-[200px]">
            Find
          </button>
        </form>
      </div>

      {/* Card section */}
      <div className="flex items-center justify-between flex-wrap max-w-[1440px] mx-auto mb-[100px]">
        <div className=" flex justify-between items-center flex-wrap">
          {hostels.length > 0 ? (
            hostels.map((item, index) => {
              return <Card key={index} {...item} />;
            })
          ) : (
            <div>No Hostels Found</div>
          )}
        </div>
      </div>

      {/* Section */}
      <div className=" bg-red-200 py-16 mb-[100px]">
        <div className=" flex justify-between items-center mx-auto max-w-[1440px]">
          <div className=" max-w-[770px] mr-16">
            <div className="text-4xl font-bold mb-4 text-red-900">
              Find your hostel
            </div>
            <div className="text-2xl text-red-700">
              Lorem ipsum paragraph is a dummy text used by designers to fill
              the space in the design. Lorem ipsum paragraph is a dummy text
              used by designers to fill the space in the design. Lorem ipsum
              paragraph is a dummy text used by designers to fill the space in
              the design. Lorem ipsum paragraph is a dummy text used by
              designers to fill the space in the design.
            </div>
          </div>
          <div className="w-[500px]">
            <img src={bgImg} alt={"Section"} />
          </div>
        </div>
      </div>

      {/* Section */}
      <div className=" py-12 bg-red-100 ">
        <div className=" max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="text-4xl font-bold text-red-900">
            Get more Information about news and offers
          </div>
          <div className="">
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 ml-4 w-[300px]"
              placeholder="Enter your email"
            />
            <button className="bg-white p-2 rounded-md ml-4 w-[100px]">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
