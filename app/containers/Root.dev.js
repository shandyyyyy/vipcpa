import {Provider} from 'react-redux';
import {Router} from 'react-router-dom'
import '../config'
import createHistory from 'history/createHashHistory'
import App from './App';

const history = createHistory();
export default class Root extends React.Component {
    render() {
        const {store} = this.props;
        return (
            <Router history={history}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </Router>
        );
    }
}