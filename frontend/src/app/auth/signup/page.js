'use client'
import { useState } from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "app/constants";
import { useRouter } from 'next/navigation';
import api from "app/api";

export default function SignUp() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('INTERN'); // Default role can be set here
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);  // Start loading
    e.preventDefault();
    console.log(username, password, email, role)
    // Sign up with Django REST framework (API)
    const response = await api.post('api-auth/users/register', 
    {
        "first_name": "Myname",
        "last_name": "Myname",
        username,
        password,
        email
     
    });
    if (response.status === 201) {
        // Handle success (e.g., save token, redirect, etc.)
        console.log('User signed up:', response.data);       
        // Redirect to the login page
        setLoading(false); 
        router.push('/auth/signin');
    } else {
        // Handle error response
        console.error('Error signing up:', response.statusText);
    }
}
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form method='post' onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="ADMIN">Admin</option>
              <option value="INTERN">Intern</option>
              <option value="COORDINATOR">Coordinator</option>
              <option value="HOST_EMPLOYER">Host Employer</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}