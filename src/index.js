import 'babel-polyfill';
import 'isomorphic-fetch';

import 'styles/global.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/App/App';
import Intro from './containers/Intro/Intro';
import Profile from './components/Profile/Profile';
import Info from './components/Info/Info';
import Edit from './components/Info/Edit';
import Gallery from './components/Gallery/Gallery';


import configureStore from './store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Intro} />
        <Route path="user/:userId" component={Profile}>
          <IndexRoute component={Info} />
          <Route path="info" component={Info} />
          <Route path="edit" component={Edit} />
          <Route path="gallery" component={Gallery} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app-root')
);
