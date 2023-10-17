import icon from '@/assets/images/marker-icon-2x.png';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
const center: LatLngExpression = {
	lat: 51.505,
	lng: -0.09,
};
export interface DraggableMarkerProps {
	draggable?: boolean;
	position: LatLngExpression;
	setPosition?: any;
}

function DraggableMarker({ draggable, position, setPosition }: DraggableMarkerProps) {
	const markerRef = useRef(null);
	const map = useMapEvents({
		locationfound(e) {
			setPosition(e.latlng);
			map.flyTo(e.latlng, map.getZoom());
		},
	});
	useEffect(() => {
		map.locate();
	}, [map]);
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current as any;
				if (marker != null) {
					console.log(marker.getLatLng());
					setPosition(marker.getLatLng());
				}
			},
		}),
		[setPosition],
	);

	return (
		<Marker
			draggable={draggable}
			eventHandlers={eventHandlers}
			position={position}
			ref={markerRef}
			icon={
				new L.Icon({
					iconUrl: icon.src,
					iconRetinaUrl: icon.src,
					iconSize: [25, 41],
					iconAnchor: [12, 41],
				})
			}
		></Marker>
	);
}
const LocationPicker = ({ position, setPosition, draggable }: DraggableMarkerProps) => {
	return (
		<div className='h-[400px]'>
			<MapContainer style={{ height: '100%' }} zoom={13} scrollWheelZoom={false} center={position}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<DraggableMarker draggable={draggable} position={position} setPosition={setPosition} />
			</MapContainer>
		</div>
	);
};

export default LocationPicker;
