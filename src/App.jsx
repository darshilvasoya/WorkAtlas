import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Default to dark mode if no preference
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme === 'dark' : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      <Router>
        <Navbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(prev => !prev)}
        />
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} isDarkMode={isDarkMode} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
