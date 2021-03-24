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
	const [
		,
		{ addMarkers, setGoogleApiLoaded, setModalVisible, setCurrentArticle },
	] = useMapStore();

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
		if (map) {
			map.setCenter(center);
		}
	}

	async function markerClicked(pageid) {
		const response = await WikipediaApi.getArticle({ pageid: pageid });
		const article = response.query.pages[pageid];
		setCurrentArticle({ url: article.fullurl, title: article.title });
		setModalVisible(true);
	}

	attachListener('mapChanged', mapChanged);
	attachListener('mapLoaded', mapLoaded);
	attachListener('searchBoxPlaceChanged', searchBoxPlaceChanged);
	attachListener('markerClicked', markerClicked);
}

export default function MapMediator() {
	useMapMediator();
	return null;
}
