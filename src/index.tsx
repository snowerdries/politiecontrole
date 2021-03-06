import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {politieControleApp} from './reducers';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

let store = createStore(politieControleApp, {}, applyMiddleware(
            thunk            
        ));

ReactDOM.render(
  <Provider store={store}><AppContainer /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
