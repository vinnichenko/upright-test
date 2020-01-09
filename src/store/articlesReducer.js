import constants from './constants';
import removeDuplicated from './utils';

const defaultState = {
  articlesIds: [],
  articlesObjects: [],
  isArticlesIdsLoading: false,
  isArticleLoading: false
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case constants.FETCH_ARTICLES_IDS_START: {
      return {
        ...state,
        isArticlesIdsLoading: true
      };
    }
    case constants.FETCH_ARTICLES_IDS_SUCCESS: {
      return {
        ...state,
        isArticlesIdsLoading: false,
        articlesIds: action.payload
      };
    }
    case constants.FETCH_ARTICLES_START: {
      return {
        ...state,
        isArticleLoading: true
      };
    }
    case constants.FETCH_ARTICLE_SUCCESS: {

      const removed = removeDuplicated(
        [action.payload, ...state.articlesObjects]
      );

      return {
        ...state,
        isArticleLoading: false,
        articlesObjects: removed
      };
    }
    default:
      return state;
  }
}

export const selectArticlesIds = state => state.articles.articlesIds;
export const isArticlesIdsLoading = state => state.articles.isArticlesIdsLoading;
export const isArticleLoading = state => state.articles.isArticleLoading;
export const selectArticlesObjects = state => state.articles.articlesObjects;

export default reducer;
