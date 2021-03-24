import ky from 'ky';

const client = ky.create({
	prefixUrl: 'https://pl.wikipedia.org/w/',
	headers: {
		'content-type': 'application/json',
	},
});

const api = {
	getArticles({ coord, radius = 1000, limit = 30 } = {}) {
		const params = {
			action: 'query',
			list: 'geosearch',
			format: 'json',
			origin: '*',
		};

		if (!coord) {
			console.error('Wikipedia API: no coord passed to getArticles');
		}

		return client
			.get(`api.php?`, {
				searchParams: {
					...params,
					gscoord: coord.lat + '|' + coord.lng,
					gsradius: radius,
					gslimit: limit,
				},
			})
			.json();
	},
	getArticle({ pageid } = {}) {
		const params = {
			action: 'query',
			format: 'json',
			pageids: pageid,
			prop: 'info',
			inprop: 'url',
			origin: '*',
		};

		if (!pageid) {
			console.error('Wikipedia API: no pageid passed to getArticle');
		}

		return client
			.get(`api.php?`, {
				searchParams: {
					...params,
				},
			})
			.json();
	},
};

export default api;
