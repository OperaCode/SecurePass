import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Lock, KeyRound } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("default"); // Toggle between default and custom
  const [customInput, setCustomInput] = useState(""); // User-defined word/number



  // const generatePassword = (e) => {
  //   e.preventDefault();
  
  //   const Uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  //   const numbers = "0123456789";
  //   const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
  
  //   let passwordCharacter = "";
  //   if (includeUppercase) passwordCharacter += Uppercase;
  //   if (includeLowercase) passwordCharacter += lowerCase;
  //   if (includeNumbers) passwordCharacter += numbers;
  //   if (includeSymbols) passwordCharacter += symbols;
  
  //   if (passwordCharacter === "") {
  //     toast.error("Select at least one character type", { autoClose: 3000 });
  //     return;
  //   }
  
  //   let finalPassword = "";
  
  //   if (mode === "custom" && (customInput).trim) {
  //     if (customInput.length >= length) {
  //       toast.error("Custom input is too long for the specified length", { autoClose: 3000 });
  //       return;
  //     }
  
  //     const remainingLength = length - customInput.length;
  //     let randomChars = "";
  
  //     // Generate the remaining random characters
  //     for (let i = 0; i < remainingLength; i++) {
  //       const randomIndex = Math.floor(Math.random() * passwordCharacter.length);
  //       randomChars += passwordCharacter[randomIndex];
  //     }
  
  //     // Shuffle the random characters only
  //     const shuffledRandomChars = randomChars
  //       .split("")
  //       .sort(() => Math.random() - 0.5)
  //       .join("");
  
  //     // Insert the customInput at a random index within the combined string
  //     const insertionIndex = Math.floor(Math.random() * (shuffledRandomChars.length + 1));
  
  //     finalPassword =
  //       shuffledRandomChars.slice(0, insertionIndex) +
  //       customInput +
  //       shuffledRandomChars.slice(insertionIndex);
  //   } else {
  //     // Generate password without custom input
  //     for (let i = 0; i < length; i++) {
  //       const randomIndex = Math.floor(Math.random() * passwordCharacter.length);
  //       finalPassword += passwordCharacter[randomIndex];
  //     }
  //   }
  
  //   setPassword(finalPassword);
    
  // };
  

  const generatePassword = (e) => {
    e.preventDefault();
  
    const Uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
  
    let passwordCharacter = "";
    if (includeUppercase) passwordCharacter += Uppercase;
    if (includeLowercase) passwordCharacter += lowerCase;
    if (includeNumbers) passwordCharacter += numbers;
    if (includeSymbols) passwordCharacter += symbols;
  
    if (passwordCharacter === "") {
      toast.error("Select at least one character type", { autoClose: 3000 });
      return;
    }
  
    let finalPassword = "";
    const trimmedCustomInput = customInput.trim(); // ✅ Trim spaces
  
    if (mode === "custom" && trimmedCustomInput) {
      if (trimmedCustomInput.length >= length) {
        toast.error("Custom input is too long for the specified length", { autoClose: 3000 });
        return;
      }
  
      const remainingLength = length - trimmedCustomInput.length;
      let randomChars = "";
  
      // Generate remaining random characters
      for (let i = 0; i < remainingLength; i++) {
        const randomIndex = Math.floor(Math.random() * passwordCharacter.length);
        randomChars += passwordCharacter[randomIndex];
      }
  
      // Shuffle random characters only
      const shuffledRandomChars = randomChars
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
  
      // Insert trimmedCustomInput at a random index within the combined string
      const insertionIndex = Math.floor(Math.random() * (shuffledRandomChars.length + 1));
  
      finalPassword =
        shuffledRandomChars.slice(0, insertionIndex) +
        trimmedCustomInput +
        shuffledRandomChars.slice(insertionIndex);
    } else {
      // Generate password without custom input
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * passwordCharacter.length);
        finalPassword += passwordCharacter[randomIndex];
      }
    }
  
    setPassword(finalPassword);
  };
  

  const copyToClipboard = () => {
    if (!password) {
      toast.error("No password to copy", { autoClose: 3000 });
      return;
    }
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!", { autoClose: 2000 });
  };

  const resetForm = () => {
    setLength(12);
    setIncludeUppercase(true);
    setIncludeLowercase(true);
    setIncludeNumbers(true);
    setIncludeSymbols(false);
    setCustomInput("");
    setPassword("");
    setMode("default");
    
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-indigo-300 to-blue-400 px-4 py-8">
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center bg-white/10 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Lock size={24} />
          SecurePass
        </h1>
        <nav className="flex gap-4">
          <button
            type="button"
            onClick={goBack}
            className="text-white font-medium px-4 py-2 rounded-lg hover:bg-white/20 transition duration-300"
            aria-label="Back to home page"
          >
            Back to Home
          </button>
        </nav>
      </header>

      {/* Main Form */}
      <form
        onSubmit={generatePassword}
        className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 w-full max-w-md space-y-6 mt-8 animate-fadeIn"
        aria-label="Password generator form"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-purple-700 flex items-center justify-center gap-2">
          <KeyRound size={28} className="animate-spin-slow" />
          Password Generator
        </h2>

        {/* Toggle Bar */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            type="button"
            onClick={() => setMode("default")}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
              mode === "default"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            
          >
            Default
          </button>
          <button
            type="button"
            onClick={() => setMode("custom")}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
              mode === "custom"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            
          >
            Custom
          </button>
        </div>

        {/* Custom Input (Visible in Custom Mode) */}
        {mode === "custom" && (
          <div className="space-y-2">
            <label htmlFor="customInput" className="block font-medium text-gray-700">
              Custom Word/Number
            </label>
            <input
              type="text"
              id="customInput"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Enter a word or number"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              
            />
          </div>
        )}

        {/* Password Length */}
        <div className="space-y-2">
          <label htmlFor="length" className="block font-medium text-gray-700">
            Password Length
          </label>
          <input
            type="number"
            id="length"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            
          />
        </div>

        {/* Character Type Checkboxes */}
        <div className="space-y-3">
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
              className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <span>Include Uppercase</span>
          </label>
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
              className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <span>Include Lowercase</span>
          </label>
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <span>Include Numbers</span>
          </label>
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <span>Include Symbols</span>
          </label>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center gap-2"
          
        >
          <KeyRound size={20} />
          Generate Password
        </button>

        {/* Password Output */}
        {password && (
          <div className="bg-gray-100 p-4 rounded-lg mt-4 text-center break-all">
            <p className="text-lg font-mono text-gray-800 mb-3">{password}</p>
            <button
              type="button"
              onClick={copyToClipboard}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
              
            >
              Copy to Clipboard
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mt-4">
          <button
            type="button"
            onClick={resetForm}
            className="w-full bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition duration-300"
            
          >
            Reset
          </button>
          <button
            type="button"
            onClick={goBack}
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition duration-300"
            
          >
            Back to Home
          </button>
        </div>
      </form>

      {/* Animation styles */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;