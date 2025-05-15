import Login from "./pages/Login";
import Register from "./pages/Register"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <>
        <Router>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App;
