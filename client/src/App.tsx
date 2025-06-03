import Login from "./pages/Login";
import Register from "./pages/Register"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Cards from "./pages/Cards";
import Favorites from "./pages/Favorites";
import Tags from "./pages/Tags";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <>
        <Router>
          <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="cards" element={<Cards />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="tags" element={<Tags />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App;
