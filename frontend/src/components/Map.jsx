import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const Harta = ({ traseu }) => {
  // Coordonatele pentru centrul Clujului
  const centrulClujului = [46.7712, 23.5900];

  // Mock pins pentru test (in Cluj)
  const mockPins = [
    {
      id: 1,
      name: 'Piața Unirii',
      coords: [46.7708, 23.5917],
      descriere: 'Piața centrală a Clujului - arhitectură medievală',
      tip: 'atracție'
    },
    {
      id: 2,
      name: 'Églises Franciscains',
      coords: [46.7720, 23.5890],
      descriere: 'Biserică franciscană din sec. XV',
      tip: 'monument'
    },
    {
      id: 3,
      name: 'Muzeu de Istorie',
      coords: [46.7730, 23.5950],
      descriere: 'Muzeu cu exponatele istoriei Clujului',
      tip: 'muzeu'
    },
    {
      id: 4,
      name: 'Castelul Banffy',
      coords: [46.7680, 23.5870],
      descriere: 'Castel istoric din epoca barocă',
      tip: 'castel'
    },
  ];

  // Dacă avem traseu cu locații, le afișez pe hartă
  // Altfel, afișez mock pins pentru test
  const pins = traseu?.places && traseu.places.length > 0
    ? traseu.places.map((place, index) => ({
        id: index,
        name: typeof place === 'string' ? place : place.nume_locatie || 'Locație',
        coords: [46.7712 + (Math.random() - 0.5) * 0.05, 23.5900 + (Math.random() - 0.5) * 0.05],
        descriere: typeof place === 'string' ? 'Locație din itinerariu' : place.descriere || '',
        tip: 'itinerariu'
      }))
    : mockPins;

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl">
      <MapContainer
        center={centrulClujului}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render markeri din pins */}
        {pins.map((pin) => (
          <Marker key={pin.id} position={pin.coords}>
            <Popup>
              <div className="text-sm font-semibold text-slate-900">
                <p className="font-bold">{pin.name}</p>
                <p className="text-slate-600 text-xs mt-1">{pin.descriere}</p>
                <p className="text-blue-600 text-xs font-semibold mt-2">
                  Tip: <span className="capitalize">{pin.tip}</span>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Harta;