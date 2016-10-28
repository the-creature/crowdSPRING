import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers/index';

export default function configureStore(initialState) {
  const middlewares = [thunk, routerMiddleware(browserHistory)];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(
    reducers,
    initialState,
    applyMiddleware(...middlewares)
  );
}
