import axios from 'axios';
import React, { useState } from 'react';
import BASE_URL from '../config';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { SpinnerDotted } from 'spinners-react';


const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async (e) => {
        setIsLoading(true);
        e.preventDefault(); // Prevent the form from submitting and refreshing the page
        try {
            const response = await axios.post(`${BASE_URL}/user/register`, {
                username,
                email,
                password,
            });
    
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login'); 
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    toast.error('User already exists. Please login instead.');
                } else {
                    toast.error(error.response.data.message || 'An error occurred. Please try again.');
                }
            } else if (error.request) {
                toast.error('No response from server. Please try again later.');
                console.error('No response received:', error.request);
            } else {
                toast.error('An error occurred. Please try again.');
                console.error('Error setting up request:', error.message);
            }
        }
        finally{
            setIsLoading(false);
        }
    };
    
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={(e)=>{handleRegister(e)}}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            value={username}
                            onChange={(e)=>{setUsername(e.target.value)}}
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e)=>{setpassword(e.target.value)}}
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {isLoading ? 
                            <span className='px-5  w-full flex'><SpinnerDotted size={23} thickness={128} speed={199} color="rgba(255, 255, 255, 1)"/></span>
                            : <p>Register</p> }
                        </button>

                        <Link
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            to={'/login'}
                        >
                            Have an account?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;