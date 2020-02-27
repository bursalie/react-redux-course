import registerServiceWorker from './registerServiceWorker'; 
//import { jsxtest } from './jsxintro/jsxintro';
import { configureStore } from './store/store';
import { App } from './presentational/App';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { getActivities } from './api/activityApi';
import { baseUrl, State, Activity } from './typesandconst/typesandconst';
import { VisibilityFilters } from './actions/actions';
import { Root } from './presentational/root';
const rootElement = document.getElementById('root');
const containerElement = document.getElementById('container');

getActivities(baseUrl).then((activities: Activity[]) => {
    let initial: State = {
        activities: activities,
        visibility: VisibilityFilters.SHOW_ALL,
        message: "simple message",
        async: { isFetching: false, msg: "" }
    }
    let store = configureStore(initial);
    //ReactDOM.render(
    //    <Provider store={store} >
    //        <App />
    //    </Provider>,
    ReactDOM.render(
        <Provider store={store} >
            <Root />
        </Provider>,
        rootElement);
    //    rootElement);
});
/*ReactDOM.render(
    <div>
        <h2>BTCSoftware</h2>
    </div>
    , rootElement);*/

//react 
//jsxtest();

//redux
//let s = store;
//ReactDOM.render(<App />, rootElement);


ReactDOM.render(<div></div>, containerElement);

registerServiceWorker();

