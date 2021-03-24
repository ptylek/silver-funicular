import WikipediaApi from '../../services/api/wikipedia';
import { useMapStore } from './store';

const listeners = {};
let map;

export function emit(event, ...args) {
	listeners[event](...args);
}

function attachListener(eventName, listener) {
	listeners[eventName] = listener;
}

function mapWikipediaArticlesToMarkers(articles) {
	return articles.map(({ lat, lon, title, pageid }) => ({
		lat,
		lng: lon,
		title,
		pageid,
	}));
}

function useMapMediator() {
	const [, { addMarkers, setGoogleApiLoaded }] = useMapStore();

	async function mapChanged(center) {
		const response = await WikipediaApi.getArticles({ coord: center });
		const articles = mapWikipediaArticlesToMarkers(
			response.query.geosearch
		);
		addMarkers(articles);
	}

	function mapLoaded(mapInstance) {
		map = mapInstance;
		setGoogleApiLoaded(true);
	}

	function searchBoxPlaceChanged(center) {
		map.setCenter(center);
	}

	attachListener('mapChanged', mapChanged);
	attachListener('mapLoaded', mapLoaded);
	attachListener('searchBoxPlaceChanged', searchBoxPlaceChanged);
}

export default function MapMediator() {
	useMapMediator();
	return null;
}
