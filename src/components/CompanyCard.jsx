import React from 'react';

function CompanyCard({ name, category, address, city, phone, website }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full max-w-md">
      <h3 className="text-xl font-semibold text-blue-700 mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-1">{category}</p>
      <p className="text-sm text-gray-600 mb-1">{address}, {city}</p>
      {phone && <p className="text-sm text-gray-600 mb-1">📞 {phone}</p>}
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
