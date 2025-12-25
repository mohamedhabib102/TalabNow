import { useState, useEffect } from 'react';
import { CiDark, CiLight } from "react-icons/ci";

function ButtonSwitchDark() {
  // 1. Initialize state with a default or the system preference
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  // 2. Use useEffect to apply the 'dark' class to the document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Save preference
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // Save preference
    }
  }, [isDarkMode]); // Re-run when isDarkMode changes

  // 3. Define the toggle function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 4. Render the button with Tailwind CSS styles
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <CiDark className="h-6 w-6 text-yellow-400" />
      ) : (
        <CiLight className="h-6 w-6 text-gray-800" />
      )}
    </button>
  );
}

export default ButtonSwitchDark;
