import ky from 'ky';

const client = ky.create({
	prefixUrl: 'https://pl.wikipedia.org/w/',
	headers: {
		'content-type': 'application/json'
	}
});

const api = {
	getArticles ({ coord, radius = 1000, limit = 10} = {}) {
		const params = {
			action: 'query',
			list: 'geosearch',
			format: 'json',
			origin: '*'
		}
		
		if (!coord) {
			console.error('Wikipedia API: no coord passed to getArticles')
		}

		return client
			.get('api.php?', {
				searchParams: {
					...params,
					gscoord: coord.lat + '|' + coord.lng,
					gsradius: radius,
					gslimit: limit
				}
			})
			.json();
	}
}

export default api;