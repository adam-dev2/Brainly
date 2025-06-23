import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;


  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}api/auth/login`, {
        email,
        password
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("fullname", response.data.user.fullname);
      localStorage.setItem("userId", response.data.user.id);


      toast.success(response.data.message);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong');
      }
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0d1117] flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-[#161b22] p-8 rounded-2xl border border-[#30363d] shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="text-sm text-gray-400 mb-1 block">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#0d1117] border border-[#30363d] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-gray-400 mb-1 block">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#0d1117] border border-[#30363d] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-grya-600 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don't have an account?{" "}
          <a href="/" className="text-red-400 hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
