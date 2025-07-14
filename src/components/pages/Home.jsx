import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyCard from '../CompanyCard';

function Home() {
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');

  // Fetch companies on mount
  useEffect(() => {
    axios.get('http://localhost:8000/api/companies')
      .then(res => {
        setCompanies(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error('Error fetching companies:', err));
  }, []);

  // Filter logic
  useEffect(() => {
    let data = companies;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(c =>
        c.name?.toLowerCase().includes(term) ||
        c.city?.toLowerCase().includes(term)
      );
    }

    if (city) {
      data = data.filter(c => c.city?.toLowerCase() === city.toLowerCase());
    }

    if (category) {
      data = data.filter(c => c.category?.toLowerCase() === category.toLowerCase());
    }

    setFiltered(data);
  }, [searchTerm, city, category, companies]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-10 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Welcome to WorkAtlas</h2>
        <p className="text-lg text-gray-600 mb-6">Explore verified local businesses across India</p>

        {/* Search */}
        <div className="w-full max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search by company name or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-full border shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

       {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* City Filter */}
          <div className="relative w-60">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border shadow-sm focus:outline-none appearance-none pr-10 bg-white"
            >
              <option value="">All Cities</option>
              <option value="Surat">Surat</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Vadodara">Vadodara</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="relative w-60">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border shadow-sm focus:outline-none appearance-none pr-10 bg-white"
            >
              <option value="">All Categories</option>
              <option value="Software Company">Software Company</option>
              <option value="IT Solutions">IT Solutions</option>
              <option value="Digital Agency">Digital Agency</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Company Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {filtered.map((company, index) => (
          <CompanyCard key={index} {...company} />
        ))}
      </div>
    </div>
  );
}

export default Home;
