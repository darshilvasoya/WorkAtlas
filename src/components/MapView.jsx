// src/components/MapView.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapView({ companies }) {
  const defaultPosition = [21.1702, 72.8311]; // Surat center

  return (
    <MapContainer center={defaultPosition} zoom={12} scrollWheelZoom style={{ height: '400px', width: '100%', marginTop: '1rem' }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {companies.map((company, index) => (
        company.lat && company.lng && (
          <Marker key={index} position={[company.lat, company.lng]}>
            <Popup>
              <strong>{company.name}</strong><br />
              {company.address}
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
}

export default MapView;
