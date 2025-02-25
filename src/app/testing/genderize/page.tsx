"use client";

import { useState, useEffect, useRef } from 'react';
import { FaMale, FaFemale } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

interface ApiResponse {
  name: string;
  gender: string;
  probability: number;
  count: number;
}

function printApiResponse(response: ApiResponse) {
  console.log('Name:', response.name);
  console.log('Gender:', response.gender);
  console.log('Probability:', response.probability);
  console.log('Count:', response.count);
}

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted value:', inputValue);

    // Make API call to Genderize.io
    fetch(`https://api.genderize.io?name=${inputValue}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('API response:', data);
        const response: ApiResponse = data;
        setApiResponse(response);
        printApiResponse(response);
      })
      .catch((err) => {
        console.error('API error:', err);
      });
  };

  const handleClose = () => {
    setApiResponse(null);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    // "If the popup exists AND the clicked element is NOT inside the popup"
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (apiResponse) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [apiResponse]);

  return (
    <div className="flex items-center justify-center min-h-screen text-black bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-green-500">Genderize Input</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
        {apiResponse && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={popupRef} className="relative bg-white p-6 rounded-lg shadow-lg w-80">
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <AiOutlineClose size={20} />
              </button>
              <div className="flex items-center">
                {apiResponse.gender === 'male' ? (
                  <FaMale className="text-blue-500 mr-2" size={24} />
                ) : (
                  <FaFemale className="text-pink-500 mr-2" size={24} />
                )}
                <p className="text-lg">
                  This name is {apiResponse.gender} with a probability of {apiResponse.probability}.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}