'use client'
import { useState } from 'react'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "app/constants";
import Button  from 'app/components/buttons/Button'
import { useRouter } from 'next/navigation';
import api from "app/api";
export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setIsloading] = useState(false);

  const handleSubmit = async (e) => {
    setIsloading(true)
    e.preventDefault();
    const response = await api.post('rest/token/', 
    {
        username,
        password  
    });

    localStorage.setItem(ACCESS_TOKEN, response.data.access);
    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

    console.log(response.status)
    console.log(response.data.access)
    console.log(response.data.refresh)

    if (response.status === 200) {
        // Handle success (e.g., save token, redirect, etc.)
        console.log('User signed up:', response.data);       
        // Redirect to the login page

      router.push('/todos');
    } else {
        // Handle error response
        console.error('Error signing up:', response.statusText);
    }
    
    // try {
    //   // Handle success (e.g., save token, redirect, etc.)
    // } catch (error) {
    //   // Handle error
    //   console.error('Error signing in', error);
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
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

          <Button isLoading={isloading} btnType="submit" btnValue="Sign In"  />
            {/* <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}
