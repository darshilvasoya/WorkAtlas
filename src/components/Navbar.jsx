import React from 'react';
import { Search, Settings, User } from 'lucide-react';

function Navbar() {
  return (
    <nav className="w-full px-6 py-4 bg-white shadow-md flex items-center justify-between">
      <h1 className="text-2xl font-bold text-blue-600">WorkAtlas</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search companies..."
            className="px-4 py-2 border rounded-full shadow-sm focus:outline-none"
          />
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>
        <User className="text-gray-600 hover:text-blue-600 cursor-pointer" />
        <Settings className="text-gray-600 hover:text-blue-600 cursor-pointer" />
      </div>
    </nav>
  );
}

export default Navbar;
