import WikipediaApi from '../../services/api/wikipedia';
import { useMapStore } from './store';

const listeners = {};

export function emit (event, ...args) {
	listeners[event](...args);
}

function attachListener(eventName, listener) {
	listeners[eventName] = listener;
}

function mapWikipediaArticlesToMarkers(articles) {
	return articles.map(({lat, lon, title, pageid}) => ({
		lat,
		lng: lon,
		title,
		pageid
	}))
}

function useMapMediator() {
	const [, { addMarkers }] = useMapStore();

	async function mapDragged(center) {
		const response = await WikipediaApi.getArticles({ coord: center });
		const articles = mapWikipediaArticlesToMarkers(response.query.geosearch);
		addMarkers(articles);

		console.log('Articles for new location:', articles);
	}

	async function mapLoaded(center) {
		const articles = await WikipediaApi.getArticles({
			coord: center
		});

		console.log('Articles for Krakow:', articles);
	}

	attachListener('mapDragged', mapDragged)
	attachListener('mapLoaded', mapLoaded)
}

export default function MapMediator() {
	useMapMediator();
	return null;
}
