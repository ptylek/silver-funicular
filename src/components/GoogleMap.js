import { useEffect } from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import { emit } from '../pages/map/mediator';
import Marker from './Marker';
import { useMapStore } from '../pages/map/store';

const KRAKOW_POSITION = {
	lat: 50.061698,
	lng: 19.9351628
}

const DEFAULT_ZOOM = 11;

const GoogleMapWrapper = styled.div`
	height: calc(100vh - 134px);
	width: 100%;
`;

const GoogleMap = () => {
	const [{markers}, ] = useMapStore();
	
	useEffect(() => {
		emit('mapLoaded', KRAKOW_POSITION);
	}, []);

	return (
		<GoogleMapWrapper>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
				defaultCenter={KRAKOW_POSITION}
				defaultZoom={DEFAULT_ZOOM}
				onChange={event => emit('mapDragged', event.center)}
			>
				{markers.map(marker => (
					<Marker key={marker.pageid} lat={marker.lat} lng={marker.lng} text={marker.title}/>
				))}
			</GoogleMapReact>
		</GoogleMapWrapper>
	)
}

export default GoogleMap;