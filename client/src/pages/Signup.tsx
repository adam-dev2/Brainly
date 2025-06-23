import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const backendURL = import.meta.env.VITE_BACKEND_URL;


  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}api/auth/register`, {
        fullname,
        email,
        password
      });
      toast.success(response.data.message);
      console.log(response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong');
      }
      console.error(error);
    }
  }

  return (
    <div className="h-screen w-screen bg-[#0d1117] flex justify-center items-center px-4">
      <div className="bg-[#161b22] w-full max-w-md p-8 rounded-2xl border border-[#30363d] shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Signin</h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div>
            <label htmlFor="fullname" className="text-sm text-gray-400 mb-1 block">Full Name</label>
            <input
              id="fullname"
              type="text"
              placeholder="Your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full p-3 bg-[#0d1117] border border-[#30363d] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm text-gray-400 mb-1 block">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#0d1117] border border-[#30363d] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
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
              className="w-full p-3 bg-[#0d1117] border border-[#30363d] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-red-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
