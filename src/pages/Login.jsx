import React, {useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

const {handleLogin} = useContext(UserContext);
const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(formData);
      console.log(formData);
      navigate('/all-posts');
    }catch(error){
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-amber-50 to-amber-100">

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <fieldset className="space-y-4">
            <legend className="text-2xl font-semibold text-center text-green-950 mb-6">Login</legend>

            <div>
              <label className="block text-sm font-medium text-black">Email</label>
              <input
                type="email"
                className="input input-bordered w-full py-3 px-4 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={formData.email}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black">Password</label>
              <input
                type="password"
                className="input input-bordered w-full py-3 px-4 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Password"
                onChange={handleChange}
                name="password"
                value={formData.password}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full py-3 mt-6 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
              Login
            </button>
          </fieldset>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>
        <p className="text-center text-sm text-gray-600 mt-2">
          <Link to="/all-posts" className="text-emerald-700 font-semibold hover:underline">
            Continue to all posts
          </Link>
        </p>
      </div>
    </div>
  );
}