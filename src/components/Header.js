import { useEffect } from 'react';
import styled from 'styled-components';
import { Input, Layout as AntLayout } from 'antd';
import { useMapStore } from '../pages/map/store';
import { emit } from '../pages/map/mediator';
const { Header: AntHeader } = AntLayout;

const Logo = styled.h2`
	color: #fff;
	margin: 0;
	white-space: nowrap;
`;

const StyledHeader = styled(AntHeader)`
	display: flex;
	align-items: center;
	padding: 0 20px;
`;

const { Search } = Input;

const SearchBox = styled(Search).attrs({
	type: 'text',
	placeholder: 'Search new location...',
})`
	margin: 0 0 0 20px;
	width: auto;
`;

export default function Header() {
	const [{ isGoogleApiLoaded }] = useMapStore();

	useEffect(() => {
		if (isGoogleApiLoaded) {
			const input = document.getElementById('searchbox');
			const searchBox = new window.google.maps.places.SearchBox(input);

			searchBox.addListener('places_changed', () => {
				const selectedPlace = searchBox.getPlaces()[0];
				const { location } = selectedPlace.geometry;

				emit('searchBoxPlaceChanged', location.toJSON());
			});
		}
	}, [isGoogleApiLoaded]);

	return (
		<StyledHeader>
			<Logo>Wikipedia Map</Logo>
			<SearchBox id='searchbox' />
		</StyledHeader>
	);
}
