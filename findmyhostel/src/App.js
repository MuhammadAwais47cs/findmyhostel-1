import { Route, Routes } from "react-router-dom";
import AboutUs from "./modules/AboutUs/AboutUs";
import ContactUs from "./modules/ContactUs/ContactUs";
import Privacy from "./modules/Privacy/Privacy";
import Form from "./modules/Form";
import Main from "./modules/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
