import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import manufacturerListReducer from './store/manufacturer.list.reducer';
import createSagaMiddleware from "redux-saga";
import { all } from 'redux-saga/effects';
import allManufacturersListSagas from './saga/manufacturer.list.saga';
import allManufacturersDetailsSagas from './saga/manufacturer.details.saga';
import manufacturerDetailsReducer from './store/manufacturer.detail.reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

function* allSaga() {
  yield all([
      ...allManufacturersListSagas,
      ...allManufacturersDetailsSagas
  ]);
}

const composeEnhancers = (process.env.NODE_ENV === 'development' ?
 window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
  manufacturersList: manufacturerListReducer,
  manufacturerDetails: manufacturerDetailsReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(allSaga);

const renderStructure = (
  <ThemeProvider theme={theme}>
     {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
     <CssBaseline />
     <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
     </Provider>
  </ThemeProvider>
)

ReactDOM.render(renderStructure, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
