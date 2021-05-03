import { applyMiddleware, createStore, compose } from 'redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import reducers from './reducers';

export function configureStore(initialStore) {
  return createStore(
    reducers,
    initialStore,
    compose(
      applyMiddleware(...getDefaultMiddleware()),
      window.__REDUX_DEVTOOLS_EXTENSION__
            && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
}
