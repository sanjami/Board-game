import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './app/store/configureStore';
import './index.css';
import App from './app/App';
import { PersistGate } from 'redux-persist/integration/react'
import registerServiceWorker from './registerServiceWorker';

const { store, persistor } = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
     document.getElementById('root'));
     
registerServiceWorker();
