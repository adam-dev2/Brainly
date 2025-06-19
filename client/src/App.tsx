import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favorites from "./pages/Dashboard/Favorites";
import Settings from "./pages/Dashboard/Settings";
import Cards from "./pages/Dashboard/Cards";
import Tags from "./pages/Dashboard/Tags";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import {Toaster} from "react-hot-toast"

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="settings" element={<Settings />} />
          <Route path="cards" element={<Cards />} />
          <Route path="tags" element={<Tags />} />
        </Route>
      </Routes>
    </Router>
    <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
