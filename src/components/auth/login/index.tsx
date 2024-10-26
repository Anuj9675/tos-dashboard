'use client';

import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { Eye, EyeOff } from 'lucide-react';

// Define the validation schema using Yup
const loginSchema = Yup.object().shape({
  email: Yup.string().required('User name is required'),
  password: Yup.string().required('Password is required')
});

// Define types for form inputs
interface LoginFormInputs {
  email: string;
  password: string;
}

// Fake API function to simulate a login request
const fakeLoginAPI = (formData: LoginFormInputs): Promise<{ accessToken: string }> => {
  return new Promise((resolve, reject) => {
    // Simulate an API call with a delay of 1 second
    setTimeout(() => {
      if (formData.email === 'tos@example.com' && formData.password === 'tos') {
        resolve({ accessToken: 'fake_access_token_123456' });
      } else {
        reject(new Error('Invalid username or password'));
      }
    }, 1000);
  });
};

export const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [loading, setLoading] = useState(false); // State for login button loading
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages

  const { handleSubmit, control } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (formData) => {
    setLoading(true);
    setErrorMessage(null); // Reset error message before login attempt

    try {
      const response = await fakeLoginAPI(formData);
      console.log('Access Token:', response.accessToken);
      
      // Store the access token in cookies
      Cookies.set('access_token', response.accessToken);

      // Redirect to dashboard or any other page
      window.location.href = '/client'; // Adjust this to your desired page
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Sign in to your account and explore a world of possibilities. Your journey begins here.
                </p>
              </div>

              {/* Show error message if login fails */}
              {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}

              <div>
                <label className="text-gray-800 text-sm mb-2 block">User name</label>
                <div className="relative flex items-center">
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        required
                        className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                        placeholder="Enter user name"
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type={passwordVisible ? 'text' : 'password'}
                        required
                        className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                        placeholder="Enter password"
                      />
                    )}
                  />
                  {passwordVisible ? (
                    <EyeOff
                      className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                  ) : (
                    <Eye
                      className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                  )}
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Log in'}
                </button>
              </div>
            </form>
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full h-full max-md:rounded-tl-[30px] max-md:rounded-tr-[30px] max-md:rounded-bl-[30px] max-md:rounded-br-[30px] object-cover rounded-lg shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]"
              alt="Login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

