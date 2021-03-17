import { useEffect } from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import WikipediaApi from '../services/api/wikipedia';

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
	useEffect(() => {
		async function fetchArticles() {
			const articles = await WikipediaApi.getArticles({
				coord: KRAKOW_POSITION
			})

			console.log('Articles for Krakow:', articles);
		}

		fetchArticles();
	}, []);

	return (
		<GoogleMapWrapper>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
				defaultCenter={KRAKOW_POSITION}
				defaultZoom={DEFAULT_ZOOM}
			>
			</GoogleMapReact>
		</GoogleMapWrapper>
	)
}

export default GoogleMap;