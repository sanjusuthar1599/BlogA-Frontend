import { all } from "redux-saga/effects";
import {watchSignupApiSaga, watchLoginpApiSaga, watchContactApiSaga, watchAddBlogApiSaga, watchGetAllBlogApiSaga, watchGetAllBlogbyidApiSaga, watchgetSignupuserApiSaga, watchDeleteBlogSaga, watchUpdateBlogSaga } from "./saga/blogsaga";

export default function* rootSaga() {
    yield all([
        watchSignupApiSaga(),
        watchLoginpApiSaga(),
        watchContactApiSaga(),
        watchAddBlogApiSaga(),
        watchGetAllBlogApiSaga(),
        watchGetAllBlogbyidApiSaga(),
        watchgetSignupuserApiSaga(),
        watchUpdateBlogSaga(),
        watchDeleteBlogSaga()
    ]);
}