import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import { emit } from '../../pages/map/mediator';
import Marker from './../Marker';
import { useMapStore } from '../../pages/map/store';
import styles from './styles';

const KRAKOW_POSITION = {
	lat: 50.061698,
	lng: 19.9351628,
};

const DEFAULT_ZOOM = 15;

const GoogleMapWrapper = styled.div`
	height: calc(100vh - 142px);
	width: 100%;
`;

const GoogleMap = () => {
	const [{ markers }] = useMapStore();

	return (
		<GoogleMapWrapper>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: process.env.REACT_APP_GOOGLE_API_KEY,
					libraries: ['places'],
				}}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={({ map, maps }) => emit('mapLoaded', map)}
				defaultCenter={KRAKOW_POSITION}
				defaultZoom={DEFAULT_ZOOM}
				options={{
					styles: styles.tinia,
				}}
				onChange={(event) => emit('mapChanged', event.center)}
			>
				{markers.map((marker) => (
					<Marker
						key={marker.pageid}
						lat={marker.lat}
						lng={marker.lng}
						title={marker.title}
						pageid={marker.pageid}
					/>
				))}
			</GoogleMapReact>
		</GoogleMapWrapper>
	);
};

export default GoogleMap;
