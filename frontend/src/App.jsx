import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AdminNavbar from "./Administration/AdminNavbar";
import Allalerts from "./Administration/Sections/Allalerts";
import OneAlert from "./Administration/Subsections/OneAlert";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtherSections from "./Administration/Sections/OtherSections";
import Allerts from "./NewAdmin/Allerts";
import UserDetails from "./NewAdmin/UserDetails";
function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/allalerts" element={<Allerts />} />
        <Route path="/allalerts/one-alert" element={<UserDetails />} />
        <Route path="/" element={<Navbar />}>
          <Route path="/admin" element={<AdminNavbar />}>
            <Route path="all-alerts" element={<Allalerts />} />
            <Route path="all-alerts/:id" element={<OneAlert />} />
            <Route path="*" element={<OtherSections />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
