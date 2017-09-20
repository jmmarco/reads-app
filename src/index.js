import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store/configureStore'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore()

ReactDOM.render(

    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={App}/>
      </BrowserRouter>
    </Provider>

, document.getElementById('root'));
registerServiceWorker();
