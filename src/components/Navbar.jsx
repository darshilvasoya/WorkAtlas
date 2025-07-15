import React from 'react';
import { Search, Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

function Navbar({ searchTerm, onSearchChange, isDarkMode, toggleDarkMode }) {
  return (
    <nav
      className={`w-full max-w-[100vw] px-6 py-4 shadow-md flex items-center justify-between transition-all duration-500 ${
        isDarkMode
          ? 'bg-[#1f2a38] text-white'
          : 'bg-gradient-to-br from-blue-200 to-blue-50'
      }`}
    >
      {/* Logo (Left) */}
      <h1 className="text-2xl font-bold text-blue-600 dark:text-white">
        WorkAtlas
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-3 overflow-x-hidden">
        {/* Search bar (hidden on small screens) */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="px-4 py-2 rounded-full border shadow focus:outline-none transition-all duration-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 dark:text-gray-300" />
        </div>

        {/* Dark Mode Toggle */}
        <motion.button
          onClick={toggleDarkMode}
          whileTap={{ scale: 0.95 }}
          className="relative px-4 py-2 rounded-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 border dark:border-gray-600 text-sm font-medium hover:shadow-md transition-all duration-300"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDarkMode ? (
              <motion.span
                key="light"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <Sun className="w-4 h-4" />
                Light
              </motion.span>
            ) : (
              <motion.span
                key="dark"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <Moon className="w-4 h-4" />
                Dark
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </nav>
  );
}

export default Navbar;
