//React Library Imports:
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, IndexRoute} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

//Styling Imports:
import './index.css';
//import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//Screen Imports:
import App from './App';

//Component Imports:
//import ScrollToTop from './Components/ScrollToTop'

const customHistory = createBrowserHistory()

ReactDOM.render(
<Router history={customHistory}>
    <App>     
    </App>
</Router>
, document.getElementById('root'));
registerServiceWorker();
