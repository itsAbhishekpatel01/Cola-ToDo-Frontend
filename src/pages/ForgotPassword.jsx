import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../config';
import { SpinnerDotted } from 'spinners-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState();
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter OTP, Step 3: Reset Password
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const handleSendOtp = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/user/forgot-password`, { email });
            if (response.data.success) {
                toast.success(response.data.message);
                setStep(2);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/user/verify-forgot-password-otp`, { email, otp });
            if (response.data.success) {
                toast.success(response.data.message);
                setStep(3);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message ||  "Invalid OTP. Please try again.");
        } finally{
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/user/reset-password`, {
                email,
                otp,
                newPassword,
            });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message || "Failed to reset password. Please try agai");
        } finally{
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                {step === 1 && (
                    <form onSubmit={handleSendOtp}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 flex justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            {
                                !isLoading ? <p>Send OTP</p>
                                : <SpinnerDotted size={24} thickness={146} speed={199} color="rgba(255, 255, 255, 1)" />
                            }
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOtp}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                                OTP
                            </label>
                            <input
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                type="number"
                                id="otp"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter the OTP"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 flex justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            {
                                !isLoading ? <p>Verify OTP</p>
                                : <SpinnerDotted size={24} thickness={146} speed={199} color="rgba(255, 255, 255, 1)" />
                            }
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                                New Password
                            </label>
                            <input
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type="password"
                                id="newPassword"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your new password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 flex justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            {
                                !isLoading ? <p>Reset Password</p>
                                : <SpinnerDotted size={24} thickness={146} speed={199} color="rgba(255, 255, 255, 1)" />
                            }
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
