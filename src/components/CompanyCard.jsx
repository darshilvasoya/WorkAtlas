import React from 'react';

function CompanyCard({ name, category, address, city, phone, website }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 h-full cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all">
      <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">{name}</h3>
      {category && (
        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs px-3 py-1 rounded-full mb-2">
          {category}
        </span>
      )}
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{address}, {city}</p>
      {phone && <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">📞 {phone}</p>}
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline"
        >
          🌐 Visit Website
        </a>
      )}
    </div>
  );
}

export default CompanyCard;
