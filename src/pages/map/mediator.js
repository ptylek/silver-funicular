import WikipediaApi from '../../services/api/wikipedia';

const listeners = {};

export function emit (event, ...args) {
	listeners[event](...args);
}

function attachListener(eventName, listener) {
	listeners[eventName] = listener;
}

function useMapMediator() {
	async function mapLoaded(center) {
		const articles = await WikipediaApi.getArticles({
			coord: center
		});

		console.log('Articles for Krakow:', articles);
	}

	async function mapDragged(center) {
		const articles = await WikipediaApi.getArticles({
			coord: center
		})

		console.log('Articles for new location:', articles);
	}

	attachListener('mapDragged', mapDragged)
	attachListener('mapLoaded', mapLoaded)
}

export default function MapMediator() {
	useMapMediator();

	return null;
}
