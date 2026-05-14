import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// ─── Fix default icon paths broken by Vite/Webpack bundling ──────────────────
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ─── Custom red marker icon ───────────────────────────────────────────────────
const redMarkerIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// ─── Config ───────────────────────────────────────────────────────────────────
const DEFAULT_PUSKESMAS = {
    latitude: -6.175,
    longitude: 106.865,
    coverageRadius: 2000, // meter
} as const;

interface MapWilayahPuskesmasProps {
    name: string;
    address: string;
    latitude?: number;
    longitude?: number;
    radius?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function MapWilayahPuskesmas({ name, address, latitude, longitude, radius }: MapWilayahPuskesmasProps) {
    const lat = latitude ?? DEFAULT_PUSKESMAS.latitude;
    const lng = longitude ?? DEFAULT_PUSKESMAS.longitude;
    const rad = radius ?? DEFAULT_PUSKESMAS.coverageRadius;
    const center: [number, number] = [lat, lng];

    const handleNavigate = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <MapContainer
            center={center}
            zoom={14}
            style={{
                height: '400px',
                width: '100%',
                borderRadius: '12px',
                zIndex: 0,
            }}
            scrollWheelZoom={false}
        >
            {/* Base tile layer — OpenStreetMap */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Coverage area circle */}
            <Circle
                center={center}
                radius={rad}
                pathOptions={{
                    color: '#16a34a',
                    fillColor: '#22c55e',
                    fillOpacity: 0.15,
                    weight: 2,
                }}
            />

            {/* Puskesmas marker */}
            <Marker position={center} icon={redMarkerIcon}>
                <Popup>
                    <div style={{ fontFamily: 'sans-serif', minWidth: '180px' }}>
                        <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: '14px' }}>
                            {name}
                        </p>
                        <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#6b7280' }}>
                            {address}
                        </p>
                        <button
                            onClick={handleNavigate}
                            style={{
                                display: 'inline-block',
                                width: '100%',
                                padding: '6px 12px',
                                backgroundColor: '#16a34a',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                textAlign: 'center',
                            }}
                        >
                            🧭 Navigasi ke sini
                        </button>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
}
