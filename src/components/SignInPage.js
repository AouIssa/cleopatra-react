import React from 'react';
import { Link } from 'react-router-dom';

const SignInPage = () => {
    return (
        <div className="flex justify-center items-center w-[568px] h-[858px]">
            <div className="w-96 p-8 bg-[#E9E1D7] rounded shadow">

                <div className="text-center text-black text-3xl font-normal tracking-[3.60px] font-['Georgia']">
                    Welcome to Cleopatra
                </div>
                <div className="text-center text-black text-4xl font-['Roboto'] font-normal uppercase tracking-[3.60px]">
                    Sign In
                </div>

                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Sign In
                    </button>
                </form>
                <div className="text-center mt-4">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 font-medium">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
