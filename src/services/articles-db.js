const articlesKey = 'articles';

function ArticlesDatabase() {
	let articles = getArticles();

	function getArticles() {
		try {
			const articles = localStorage.getItem(articlesKey);

			if (articles) {
				return JSON.parse(articles);
			} else {
				return [];
			}
		} catch (e) {
			console.error('Error while reading articles from localStorage', e);
		}
	}

	function addArticle(pageid) {
		try {
			articles.push(pageid);
			localStorage.setItem(articlesKey, JSON.stringify(articles));
		} catch (e) {
			console.error('Error while adding article to localStorage', e);
		}
	}

	const api = {
		refresh() {
			articles = getArticles();
		},
		isArticleViewed(pageid) {
			return articles.includes(pageid);
		},
		setArticleAsViewed(pageid) {
			addArticle(pageid);
		},
	};
	return api;
}

export default ArticlesDatabase();
