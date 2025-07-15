// src/components/MapView.jsx

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import cityCoordinates from '../utils/cityCoordinates';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapView({ company }) {
  const coords = cityCoordinates[company.city] || [22.9734, 78.6569]; // fallback to India center

  return (
    <div className="h-96 w-full rounded-xl shadow overflow-hidden">
      <MapContainer center={coords} zoom={13} scrollWheelZoom={false} className="h-full w-full z-10">
        <TileLayer
          attribution='© OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords}>
          <Popup>
            <strong>{company.name}</strong><br />
            {company.address || 'No address provided'}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapView;
