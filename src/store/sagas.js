import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import constants from './constants';

function* getArticlesIds() {
  try {
    const response = yield call(axios.get,'https://hacker-news.firebaseio.com/v0/topstories.json');
    yield put({
      type: constants.FETCH_ARTICLES_IDS_SUCCESS,
      payload: response.data
    });
    yield put({
      type: constants.FETCH_ARTICLES_START,
      payload: response.data.slice(0, 30)
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: constants.FETCH_ARTICLES_IDS_ERROR,
      payload: 'Can not fetch articles'
    });
  }
}

function* getArticles(action) {
  const { payload } = action;
  yield all(
    payload.map(item =>
      fork(
        getArticle,
        item,
        constants.FETCH_ARTICLE_SUCCESS,
        constants.FETCH_ARTICLE_ERROR
      )
    )
  );
}

function* getArticle(item, successType, errorType) {
  try {
    const response = yield call(axios.get,`https://hacker-news.firebaseio.com/v0/item/${item}.json`);
    yield put({
      type: successType,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: errorType,
      payload: 'Can not fetch an article'
    });
  }
}

function* watchGetArticlesIds() {
  yield takeLatest(constants.FETCH_ARTICLES_IDS_START, getArticlesIds);
}

function* watchGetArticles() {
  yield takeLatest(constants.FETCH_ARTICLES_START, getArticles);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetArticlesIds),
    fork(watchGetArticles)
  ]);
}
