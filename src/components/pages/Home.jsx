  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import CompanyCard from '../CompanyCard';
  import CompanyPanel from '../CompanyPanel';

  function Home({ isDarkMode }) {
    const [companies, setCompanies] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [city, setCity] = useState('');
    const [category, setCategory] = useState('');
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginatedData = filtered.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    useEffect(() => {
      axios.get('http://localhost:8000/api/companies')
        .then(res => {
          setCompanies(res.data);
          setFiltered(res.data);
        })
        .catch(err => console.error('Error fetching companies:', err));

      axios.get('http://localhost:8000/api/cities')
        .then(res => setCities(res.data))
        .catch(err => console.error('Error fetching cities:', err));

      axios.get('http://localhost:8000/api/categories')
        .then(res => setCategories(res.data))
        .catch(err => console.error('Error fetching categories:', err));
    }, []);

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
      setCurrentPage(1); // Reset to page 1 on filter
    }, [searchTerm, city, category, companies]);

    return (
      <div className={`min-h-screen px-4 sm:px-6 md:px-10 py-10
 flex flex-col items-center text-gray-900 dark:text-white transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-blue-100'
      }`}>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to WorkAtlas</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Explore verified local businesses across India
          </p>

          {/* Search */}
          <div className="w-full max-w-md mx-auto mb-6">
            <input
              type="text"
              placeholder="Search by company name or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 rounded-full border shadow focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* City Filter */}
            <div className="relative w-60">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-5 py-3 rounded-lg border shadow-sm focus:outline-none appearance-none pr-10 bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Cities</option>
                {cities.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-300"
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
                className="w-full px-5 py-3 rounded-lg border shadow-sm focus:outline-none appearance-none pr-10 bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Categories</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-300"
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
          {paginatedData.map((company, index) => (
            <div
              key={index}
              onClick={() => setSelectedCompany(company)}
              className="cursor-pointer"
            >
              <CompanyCard {...company} />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-lg">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        {/* Company Detail Panel */}
        {selectedCompany && (
          <CompanyPanel
            company={selectedCompany}
            onClose={() => setSelectedCompany(null)}
          />
        )}
      </div>
    );
  }

  export default Home;
