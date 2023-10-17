import { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

interface LocationMapProps {
	position: LatLngExpression;
	height: string;
}

function LocationMap({ position, height }: LocationMapProps) {
	return (
		<div className={height}>
			<MapContainer style={{ height: '100%' }} zoom={13} scrollWheelZoom={false} center={position}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
			</MapContainer>
		</div>
	);
}

export default LocationMap;
