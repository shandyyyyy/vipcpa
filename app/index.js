import './util/es5-sham.min'
import './util/es5-shim.min'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
//import { Router } from 'react-router'
import {Route,BrowserRouter, Switch} from 'react-router-dom';
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import {routeConfig} from './routes'
import './config'
import configure from './store/configureStore'
import myhistory from './history'
import App from './containers/App'
const store = configure({ config: global.$GLOBALCONFIG })
const history = syncHistoryWithStore(myhistory, store)
import About from './containers/About'
ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    {/*<Router history={history} routes={routeConfig}></Router>*/}
                    <Route exact path="/" component={About}></Route>
                </Switch>
            </BrowserRouter>

        </Provider>
    </AppContainer>,document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        try {
            const NextRoot = require('./containers/Root').default;
            ReactDOM.render(<NextRoot store={store} />, document.getElementById('root'));
        } catch (e) {
            console.error(e.stack);
        }
    })
}


