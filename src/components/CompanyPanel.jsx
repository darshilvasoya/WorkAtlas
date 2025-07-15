import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// Dynamically update map center
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position && position[0] && position[1]) {
      map.setView(position, 13);
    }
  }, [position, map]);
  return null;
}

function CompanyPanel({ company, onClose }) {
  const { name, address, phone, website, category, city, latitude, longitude } = company;

  const hasValidCoords = latitude && longitude && !isNaN(latitude) && !isNaN(longitude);
  const position = hasValidCoords ? [parseFloat(latitude), parseFloat(longitude)] : [20.5937, 78.9629];

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.id === 'overlay') onClose();
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [onClose]);

  return (
    <div
      id="overlay"
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] relative p-6 text-gray-800 dark:text-gray-100 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 dark:text-gray-300 text-2xl hover:text-red-500"
        >
          ×
        </button>

        <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">{name}</h3>
        <hr className="border-gray-400 dark:border-gray-600 mb-6" />

        <div className="space-y-3 text-sm mb-4">
          {category && <p><span className="font-semibold">Category:</span> {category}</p>}
          {address && <p><span className="font-semibold">Address:</span> {address}</p>}
          {city && <p><span className="font-semibold">City:</span> {city}</p>}
          {phone && <p><span className="font-semibold">Phone:</span> {phone}</p>}
          {website && (
            <p>
              <span className="font-semibold">Website:</span>{' '}
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {website}
              </a>
            </p>
          )}
        </div>

        <div className="mt-4">
          <h4 className="font-semibold mb-2">Map Location</h4>
          <div className="h-56 w-full rounded-xl overflow-hidden">
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full">
              <RecenterMap position={position} />
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>{name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyPanel;
