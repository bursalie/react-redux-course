import { createStore, Store, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { activityApp } from "../reducers/reducers";
import { State } from "../typesandconst/typesandconst";
import { FilterAction, ActivityAction, MessageAction, AsyncAction } from "../actions/actions";

export function configureStore(initial: State): Store<State, ActivityAction | FilterAction | MessageAction | AsyncAction> {

    //let store = createStore<State, ActivityAction | FilterAction | MessageAction, {}, {}>(activityApp,initial);
    let store = createStore<State, ActivityAction | FilterAction | MessageAction | AsyncAction, {}, {}>(
        activityApp, initial, applyMiddleware(thunk));
    console.log(store.getState());

    //install a listener
    //onst unsubscribe = store.subscribe(() => console.log(store.getState()));

    //Dispatch some actions
    //store.dispatch(addActivity("Walking"));
    //store.dispatch(addActivity("Learning"));
    //store.dispatch(changeActivity(0));
    //store.dispatch(setVisibility(VisibilityFilters.SHOW_COMPLETED));

    //unsubscribe();
    return store;
}