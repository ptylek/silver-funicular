import WikipediaApi from '../../services/api/wikipedia';
import ArticlesDatabase from '../../services/articles-db';
import { useMapStore } from './store';
import debounce from 'lodash/debounce';

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

function mapViewedArticles(articles) {
	return articles.map(({ pageid, ...rest }) => ({
		...rest,
		pageid,
		isViewed: ArticlesDatabase.isArticleViewed(pageid),
	}));
}

const callGetArticlesAfterLastInvocationMs = 1000;

function useMapMediator() {
	const [
		,
		{
			addMarkers,
			setGoogleApiLoaded,
			setModalVisible,
			setCurrentArticle,
			setArticleWasViewed,
		},
	] = useMapStore();

	const debouncedGetArticles = debounce(
		getArticlesForMapCenter,
		callGetArticlesAfterLastInvocationMs
	);

	async function getArticlesForMapCenter(center) {
		const response = await WikipediaApi.getArticles({
			coord: map.center.toJSON(),
			limit: 50,
		});
		let articles = mapWikipediaArticlesToMarkers(response.query.geosearch);
		articles = mapViewedArticles(articles);
		addMarkers(articles);
	}

	function mapLoaded(mapInstance) {
		map = mapInstance;
		map.addListener('idle', debouncedGetArticles);
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
		setArticleWasViewed({ pageid, isViewed: true });
		ArticlesDatabase.setArticleAsViewed(pageid);
	}

	attachListener('mapLoaded', mapLoaded);
	attachListener('searchBoxPlaceChanged', searchBoxPlaceChanged);
	attachListener('markerClicked', markerClicked);
}

export default function MapMediator() {
	useMapMediator();
	return null;
}
