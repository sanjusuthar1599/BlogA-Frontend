import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "../../reducers/reducer/blogreducer";
import {
  postsignup,
  postsignin,
  postcontact,
  postaddblog,
  getallposts,
  getblogbyid,
  getsignupuser,
  updateblog,
  deleteblog
} from "../../../api/blogApi";

//Signup API Saga
export function* postSignupApiSaga({ payload }) {
  try {
    yield put(actions.postSignupAPiLoading(true));
    yield put(actions.postSignupAPiSuccess(false));
    const userData = yield call(postsignup, payload);
    yield put(actions.postSignupAPiResponse({ response: userData }));
    yield put(actions.postSignupAPiLoading(false));
    yield put(actions.postSignupAPiSuccess(true));
  } catch (error) {
    yield put(actions.postSignupAPiSuccess(false));
    yield put(actions.postSignupAPiLoading(false));
  }
}

//get all user API Saga
export function* getSignupuserApiSaga({ payload }) {
  try {
    yield put(actions.getSignupuserAPiLoading(true));
    yield put(actions.getSignupuserAPiSuccess(false));
    const userData = yield call(getsignupuser, payload);
    yield put(actions.getSignupuserAPiResponse({ response: userData }));
    yield put(actions.getSignupuserAPiLoading(false));
    yield put(actions.getSignupuserAPiSuccess(true));
  } catch (error) {
    yield put(actions.getSignupuserAPiSuccess(false));
    yield put(actions.getSignupuserAPiLoading(false));
  }
}

//login API Saga
export function* postLoginApiSaga({ payload }) {
  try {
    yield put(actions.postLoginAPiLoading(true));
    yield put(actions.postLoginAPiSuccess(false));
    const userData = yield call(postsignin, payload);
    yield put(actions.postLoginAPiResponse({ response: userData }));

    yield put(actions.postLoginAPiLoading(false));
    yield put(actions.postLoginAPiSuccess(true));
  } catch (error) {
    yield put(actions.postLoginAPiSuccess(false));
    yield put(actions.postLoginAPiLoading(false));
  }
}

//Contact API Saga
export function* postContactApiSaga({ payload }) {
  try {
    yield put(actions.postContactAPiLoading(true));
    yield put(actions.postContactAPiSuccess(false));
    const sportData = yield call(postcontact, payload);

    yield put(actions.postContactAPiResponse({ response: sportData }));

    yield put(actions.postContactAPiLoading(false));
    yield put(actions.postContactAPiSuccess(true));
  } catch (error) {
    yield put(actions.postContactAPiSuccess(false));
    yield put(actions.postContactAPiLoading(false));
  }
}

// Add Blog API Saga
export function* postAddBlogApiSaga({ payload }) {
  try {
    yield put(actions.postAddBlogAPiLoading(true));
    yield put(actions.postAddBlogAPiSuccess(false));

    const postBlog = yield call(postaddblog, payload);

    yield put(actions.postAddBlogAPiResponse({ response: postBlog }));

    yield put(actions.postAddBlogAPiLoading(false));
    yield put(actions.postAddBlogAPiSuccess(true));
  } catch (error) {
    yield put(actions.postAddBlogAPiSuccess(false));
    yield put(actions.postAddBlogAPiLoading(false));
  }
}

// get all Blog API Saga
export function* GetAllBlogApiSaga() {
  try {
    yield put(actions.getAllBlogAPiLoading(true));
    yield put(actions.getAllBlogAPiSuccess(false));

    const getBlog = yield call(getallposts);

    yield put(actions.getAllBlogAPiResponse({ response: getBlog }));

    yield put(actions.getAllBlogAPiLoading(false));
    yield put(actions.getAllBlogAPiSuccess(true));
  } catch (error) {
    yield put(actions.getAllBlogAPiSuccess(false));
    yield put(actions.getAllBlogAPiLoading(false));
  }
}

// get all Blog bu id API Saga
export function* GetAllBlogbyidApiSaga(action) {
  try {
    yield put(actions.getAllBlogbyidAPiLoading(true));
    yield put(actions.getAllBlogbyidAPiSuccess(false));

    const userId = action.payload;

    const getBlogbyid = yield call(getblogbyid, userId);

    yield put(actions.getAllBlogbyidAPiResponse({ response: getBlogbyid }));

    yield put(actions.getAllBlogbyidAPiLoading(false));
    yield put(actions.getAllBlogbyidAPiSuccess(true));
  } catch (error) {
    yield put(actions.getAllBlogbyidAPiSuccess(false));
    yield put(actions.getAllBlogbyidAPiLoading(false));
  }
}

// update Blog bu id API Saga
export function* UpdateBlogbyidApiSaga(action) {
  try {
    yield put(actions.updateBlogbyidAPiLoading(true));
    yield put(actions.updateBlogbyidAPiSuccess(false));

    
    const { id, title, content, image } = action.payload;

     const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    if (image instanceof File) {
      form.append("image", image);
    }

    const response = yield call(updateblog, id, form);


    yield put(actions.updateBlogbyidAPiResponse({ response }));

    yield put(actions.updateBlogbyidAPiLoading(false));
    yield put(actions.updateBlogbyidAPiSuccess(true));
  } catch (error) {
    yield put(actions.updateBlogbyidAPiSuccess(false));
    yield put(actions.updateBlogbyidAPiLoading(false));
  }
}

// delete Blog by id API Saga
export function* DeleteBlogByIdSaga(action) {
  try {
    yield put(actions.deleteBlogLoading(true));
    yield put(actions.deleteBlogSuccess(false));

    const blogId = action.payload;

    const response = yield call(deleteblog, blogId);

    yield put(actions.deleteBlogResponse({ response }));

    yield put(actions.deleteBlogLoading(false));
    yield put(actions.deleteBlogSuccess(true));
  } catch (error) {
    console.error("Delete blog error:", error);
    yield put(actions.deleteBlogLoading(false));
    yield put(actions.deleteBlogSuccess(false));
  }
}

//signup API watcher saga
export function* watchSignupApiSaga() {
  yield takeLatest(actions.postSignupAPiRequest.type, postSignupApiSaga);
}

// login watcher saga
export function* watchLoginpApiSaga() {
  yield takeLatest(actions.postLoginAPiRequest.type, postLoginApiSaga);
}

// contact watcher saga
export function* watchContactApiSaga() {
  yield takeLatest(actions.postContactAPiRequest.type, postContactApiSaga);
}

// add post watcher saga
export function* watchAddBlogApiSaga() {
  yield takeLatest(actions.postAddBlogAPiRequest.type, postAddBlogApiSaga);
}

// get all post watcher saga
export function* watchGetAllBlogApiSaga() {
  yield takeLatest(actions.getBlogAPiRequest.type, GetAllBlogApiSaga);
}

// get all blog by id  watcher saga
export function* watchGetAllBlogbyidApiSaga() {
  yield takeLatest(actions.getBlogbyidAPiRequest.type, GetAllBlogbyidApiSaga);
}

// get all blog by id  watcher saga
export function* watchgetSignupuserApiSaga() {
  yield takeLatest(actions.getSignupuserAPiRequest.type, getSignupuserApiSaga);
}

// Update blog by id watcher saga
export function* watchUpdateBlogSaga() {
  yield takeLatest(actions.updatebyidAPiRequest.type, UpdateBlogbyidApiSaga);
}

// delete blog by id watcher saga
export function* watchDeleteBlogSaga() {
  yield takeLatest(actions.deleteBlogRequest.type, DeleteBlogByIdSaga);
}
