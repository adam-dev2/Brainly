import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e:any) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password
      });
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/dashboard")
      },1000)
      console.log(response.data);
    } catch (error:any) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong');
      }
      console.error(error);
    }
  }

  return (
    <div className="h-screen w-screen bg-[#2F4858] flex justify-center items-center font-serif">
  <div className="bg-gray-900/40 backdrop-blur-2xl max-w-sm w-full rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6">
    
    <h1 className="text-4xl font-extrabold text-white">Login</h1>
    
    <form className="w-full flex flex-col gap-5" onSubmit={handleLogin}>
      
      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-white text-sm mb-2 ml-1">Email</label>
        <input 
          id="email"
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-lg outline-none border border-transparent focus:border-[#F3F7F0] placeholder-gray-400 bg-white/20 text-white transition"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label htmlFor="password" className="text-white text-sm mb-2 ml-1">Password</label>
        <input 
          id="password"
          type="password" 
          placeholder="Enter your password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-lg outline-none border border-transparent focus:border-[#F3F7F0] placeholder-gray-400 bg-white/20 text-white transition"
        />
      </div>

      <button 
        type="submit"
        className="mt-6 bg-[#F3F7F0] text-gray-900 font-semibold p-3 rounded-xl hover:bg-[#19323C] hover:text-[#F3F7F0] transition duration-100 cursor-pointer"
      >
        Login
      </button>
    </form>

    <p className="text-white text-sm">
      Don't have an account?{" "}
      <a href="/" className="underline hover:text-[#F3F7F0]">
        Create one
      </a>
    </p>

  </div>
</div>

  );
}

export default Login;
