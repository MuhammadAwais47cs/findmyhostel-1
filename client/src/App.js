import { Route, Routes } from "react-router-dom";
import AboutUs from "./modules/AboutUs/AboutUs";
import ContactUs from "./modules/ContactUs/ContactUs";
import Privacy from "./modules/Privacy/Privacy";
import Form from "./modules/Form";
import Main from "./modules/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HostelRegistrationForm from "./modules/registerationForm/index.js";
import Hostels from "./modules/Hostels";
import Admin from "./modules/Admin";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/add-hostel" element={<HostelRegistrationForm />} />
        <Route path="/hostels" element={<Hostels />} />
        <Route path="/admin" element={JSON.parse(localStorage.getItem('user'))?.userType === 'admin' ? <Admin/> : <h1>404: Not Found</h1>} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
