import { Action, ActionCreator, Dispatch} from "redux"
import { baseUrl, Activity } from "../typesandconst/typesandconst";
import { addActivityApi, changeActivityApi } from "../api/activityApi";
//enums
export enum ActivityEnum {
    ADD_ACTIVITY = 'ADD_ACTIVITY',
    CHANGE_ACTIVITY = 'CHANGE_ACTIVITY'
}
export enum FilterEnum {
    SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
}
export enum VisibilityFilters {
    SHOW_ALL = 'SHOW_ALL'
    , SHOW_COMPLETED = 'SHOW_COMPLETED'
    , SHOW_ACTIVE ='SHOW_ACTIVE'
}

export enum MessageEnum {
    SEND_MESSAGE = 'SEND_MESSAGE'
}
export enum AsyncEnum {
    ASYNC_REQUEST_START = 'ASYNC_REQUEST_START',
    ASYNC_REQUEST_END_SUCCESS = 'ASYNC_REQUEST_END_SUCCESS',
    ASYNC_REQUEST_END_FAILURE = 'ASYNC_REQUEST_END_FAILURE'
}
//Actions
export interface ActivityAction extends Action<ActivityEnum> {
    text?: string,
    index?:number
}
export interface FilterAction extends Action<FilterEnum> {
    filter: VisibilityFilters
}
export interface MessageAction extends Action<MessageEnum> {
    msg: string
}
export interface AsyncAction extends Action<AsyncEnum> {
    isFetching:boolean,
    msg: string
}
//action creators
export const addActivityAsync = (text: string) => {
    return async function (dispatch: Dispatch<Action>): Promise<Action> {
        try {
            dispatch(requestStart("Requesting Data"));
            let activityadded = await addActivityApi(baseUrl, text);
            dispatch(requestEndSuccess("Done"));
            return dispatch(addActivity(activityadded.text));
        } catch (e) {
            return dispatch(requestEndFailure("ERROR"));
        }
        
    }
}
export const addActivity: ActionCreator<ActivityAction> = (text: string):
    ActivityAction => {
    const action: ActivityAction = { type: ActivityEnum.ADD_ACTIVITY, text: text }
    return action;
}

export const changeActivityAsync = (activity:Activity) => {
    return async function (dispatch: Dispatch<Action>): Promise<Action> {
        try {
            dispatch(requestStart("Requesting Data"));
            let activityadded = await changeActivityApi(baseUrl, activity);
            dispatch(requestEndSuccess("Done"));
            return dispatch(changeActivity(activityadded.id));
        } catch (e) {
            return dispatch(requestEndFailure("ERROR"));
        }
    }
}

export const changeActivity: ActionCreator<ActivityAction> = (index: number):
    ActivityAction => {
    const action: ActivityAction = { type: ActivityEnum.CHANGE_ACTIVITY, index: index }
    return action;
}

export const setVisibility: ActionCreator<FilterAction> = (filter: VisibilityFilters):
    FilterAction => {
    const action: FilterAction = { type: FilterEnum.SET_VISIBILITY_FILTER, filter: filter }
    return action;
}

export const sendMessage: ActionCreator<MessageAction> = (msg: string):
    MessageAction => {
    const action: MessageAction = { type: MessageEnum.SEND_MESSAGE, msg }
    return action;
}

export const requestStart: ActionCreator<AsyncAction> = (msg: string):
    AsyncAction => {
    const action: AsyncAction = { type: AsyncEnum.ASYNC_REQUEST_START, isFetching: true, msg:msg }
    return action;
}
export const requestEndSuccess: ActionCreator<AsyncAction> = (msg: string):
    AsyncAction => {
    const action: AsyncAction = { type: AsyncEnum.ASYNC_REQUEST_END_SUCCESS, isFetching: true, msg: msg }
    return action;
}
export const requestEndFailure: ActionCreator<AsyncAction> = (msg: string):
    AsyncAction => {
    const action: AsyncAction = { type: AsyncEnum.ASYNC_REQUEST_END_FAILURE, isFetching: true, msg: msg }
    return action;
}