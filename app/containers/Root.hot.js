import {Provider} from 'react-redux';
import {AppContainer as HotContainer} from 'react-hot-loader';
import {Router, Switch} from 'react-router-dom'
import {syncHistoryWithStore} from 'react-router-redux'
import '../config'
import createHistory from 'history/createHashHistory'

const history = createHistory();
import App from './App';

export default class Root extends React.Component {
    render() {
        const {store} = this.props;
        return (
            <HotContainer>
                <Router history={history}>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </Router>
            </HotContainer>
        );
    }
}