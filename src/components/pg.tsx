"use client"



"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import pass2 from "../image/p2.png";

function Pg() {
  const [length, setLength] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passRef = useRef<HTMLInputElement>(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-_=+\\|[]{};:/?.>";

    for (let i = 0; i < length; i++) { // Start from 0
      const char = Math.floor(Math.random() * str.length); // Use only str.length
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Backspace") {
      setPassword(""); // Clear the password when Backspace is pressed
    }
  }, []);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown); // Add event listener for keydown
    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Clean up on component unmount
    };
  }, [handleKeyDown]);

  return (
    <>
      <div className='flex items-center justify-center min-h-screen bg-gray-700'
      style={{
        backgroundImage: `url(${pass2.src})`,
        backgroundSize: '50%',
        backgroundPosition: "top left",
      }}>
        <div className='w-full max-w-md mx-auto shadow-lg rounded-lg p-6 my-8 text-orange-500 bg-gray-800'>
          <h1 className='text-orange-500 text-center text-3xl font-semibold mb-6'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-6'>
            <input
              type="text"
              value={password}
              className='outline-none w-full py-2 px-3 bg-gray-700 text-white'
              placeholder='Generated Password'
              readOnly
              ref={passRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className={`outline-none px-4 py-2 shrink-0 ${copied ? 'bg-green-600' : 'bg-blue-700'} text-white transition-colors`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Length */}
          <div className='flex flex-col gap-y-4 text-sm'>
            <div className='flex items-center gap-x-2'>
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className='cursor-pointer w-full'
                onChange={(e) => setLength(Number(e.target.value))}
              />
              <label>Length: {length}</label>
            </div>

            {/* Number Checkbox */}
            <div className='flex items-center gap-x-2'>
              <input
                type="checkbox"
                checked={numberAllowed}
                id='numberInput'
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor="numberInput">Include Numbers</label>
            </div>

            {/* Characters Checkbox */}
            <div className='flex items-center gap-x-2'>
              <input
                type="checkbox"
                checked={charAllowed}
                id='charInput'
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="charInput">Include Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pg;

