import constants from './constants';

export const fetchArticlesIds = () => ({
  type: constants.FETCH_ARTICLES_IDS_START,
});

export const fetchArticles = ids => ({
  type: constants.FETCH_ARTICLES_START,
  payload: ids
});
