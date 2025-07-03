import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import saga from '../middlewar/rootsaga';
import rootReducer from '../reducers/rootreducer';

const RESET_STORE_ACTION_TYPE = 'store/reset';

const rootReducerWithReset = (state, action) => {
  if (action.type === RESET_STORE_ACTION_TYPE) {
    return rootReducer(undefined, { type: undefined });
  }
  return rootReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducerWithReset,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false
    }).concat(sagaMiddleware),
//   devTools: process.env.REACT_APP_ENV === 'development'
  devTools: 'development'
});

sagaMiddleware.run(saga);

export const resetStore = () => ({ type: RESET_STORE_ACTION_TYPE });

export default store;
