import './util/es5-sham.min'
import './util/es5-shim.min'
import React from 'react';
import ReactDOM from 'react-dom'
import Root from './containers/Root';
import './config'
import configure from './store/configureStore'
const store = configure({ config: global.$GLOBALCONFIG })
const rootEl = document.getElementById('root');
//const history = syncHistoryWithStore(myhistory, store)
try {
    ReactDOM.render(<Root store={store} />, document.getElementById('root'));
} catch (e) {
    console.error(e.stack);
}
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'hot' && module.hot) {
    module.hot.accept('./containers/Root', () => {
        try {
            const NextRoot = require('./containers/Root').default;
            ReactDOM.render(<NextRoot store={store} />, rootEl);
        } catch (e) {
            console.error(e.stack);
        }
    })
}