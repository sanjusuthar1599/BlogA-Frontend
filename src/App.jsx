import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Component/Authecation/Signup.jsx";
import Login from "./Component/Authecation/Login.jsx";
import Contact from "./pages/Contact.jsx";
import Sidebar from "./Component/Sidebar/Sidebar.jsx";
import Dashboard from "./Component/Dashboard/Dashboard.jsx";
import Addpost from "./Component/AddPost/Addpost.jsx";
import { Toaster } from "react-hot-toast"; 
import Setting from "./Component/Setting/Setting.jsx";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ Nested routes under Sidebar */}
          <Route path="/" element={<Sidebar />}>
            <Route index element={<Dashboard />} /> 
            <Route path="contact" element={<Contact />} /> 
            <Route path="add-post" element={<Addpost />} />
            <Route path="setting" element={<Setting />} />

          </Route>
        </Routes>
      </Router>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "16px",
          },
        }}
      />
    </>
  );
};

export default App;
