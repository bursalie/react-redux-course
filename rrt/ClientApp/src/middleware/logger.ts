import { Store, Action, Dispatch, MiddlewareAPI } from "redux";

//Attemp 1 : patching dispatch
/*
export function patchStoreToAddLogging(store: Store) {
    const next = store.dispatch;
    store.dispatch = function dispatchAndLog<T extends Action>(action: T) {
        console.log("in dispatchAndLog - Start");
        const result = next(action);
        console.log("in dispatchAndLog - End");
        return result;
    }
}
export function patchStoreToAddCrashReporting(store: Store) {
    const next = store.dispatch;
    store.dispatch = function dispatchAndReportErrors<T extends Action>(action: T) {
        try {
            console.log("in dispatchAndReportErrors - Start");
            const result = next(action);
            console.log("in dispatchAndReportErrors - End");
            return result;
        } catch (e) {
            console.error("cought an error: " + e);
            throw e;
        }
        
    }
}
*/
//Attemp 2
export function patchStoreToAddLogging(store: Store) {
    const next = store.dispatch;
    //store.dispatch = function dispatchAndLog<T extends Action>(action: T) {
    return function dispatchAndLog<T extends Action>(action: T) {
        console.log("in dispatchAndLog - Start");
        const result = next(action);
        console.log("in dispatchAndLog - End");
        return result;
    }
}
export function patchStoreToAddCrashReporting(store: Store) {
    const next = store.dispatch;
    //store.dispatch = function dispatchAndReportErrors<T extends Action>(action: T) {
    return function dispatchAndReportErrors<T extends Action>(action: T) {
        try {
            console.log("in dispatchAndReportErrors - Start");
            const result = next(action);
            console.log("in dispatchAndReportErrors - End");
            return result;
        } catch (e) {
            console.error("cought an error: " + e);
            throw e;
        }

    }
}

type midtype = ((store: Store) => <T extends Action>(action: T) => T)[]
export function myApplyMiddleware(store: Store, middlewares: midtype) {

    middlewares = middlewares.reverse();
    middlewares.forEach((middleware) => store.dispatch = middleware(store))
}

export function logger(store: Store) {
    return function wrapDispatchToAddLogging(next: Dispatch<Action>) {
        return function dispatchAndLog<T extends Action>(action: T) {
            console.log("in logger - Start");
            const result = next(action);
            console.log("in logger - End");
            return result;
        }
    }
}
//attempt 3
export type midtype2 = (store: Store) => (next: Dispatch<Action>) => <T extends Action>(action: T) => T


export const logger2:midtype2 = (store)=>(next) => (action) => {
    console.log("in logger2 - Start");
    const result = next(action);
    console.log("in logger2 - End");
    return result;   
}

export const crashreporter2: midtype2 = (store) => (next) => (action) => {
    console.log("in crashreporter2 - Start");
    const result = next(action);
    console.log("in crashreporter2 - End");
    return result;
}

export function myApplyMiddleware2(store: Store, middlewares: midtype2[]) {
    let dispatch = store.dispatch;
    middlewares.forEach(middleware => (dispatch = (middleware(store)(dispatch))));
    return Object.assign({}, store, {dispatch});
}

export type midtype3 = (mapi: MiddlewareAPI) => (next: Dispatch<Action>) => <T extends Action>(action: T) => T

export const logger3: midtype3 = (mapi) => (next) => (action) => {
    console.log("in logger3 - Start");
    const result = next(action);
    console.log("in logger3 - End");
    return result;
}
//for testing
export const mythunk: midtype3 = (mapi) => (next) => (action) => {
    if (action instanceof Function) return action(next);
    else return next(action);
}