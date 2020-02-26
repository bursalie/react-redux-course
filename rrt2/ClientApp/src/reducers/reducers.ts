import { Reducer } from "react";
import { ActivityState, Activity, FilterState, MessageState, AsyncState } from "../typesandconst/typesandconst";
import { ActivityAction, ActivityEnum, FilterAction, VisibilityFilters, FilterEnum, MessageAction, MessageEnum, AsyncAction, AsyncEnum } from "../actions/actions";
import { combineReducers } from "redux";

//managing actions related to activities
export const activityreducer: Reducer<ActivityState, ActivityAction> =
    (state: ActivityState = new Array<Activity>(), action: ActivityAction): ActivityState => {

        console.log("in activityreducer " + JSON.stringify(action));
        //we support 2 actions
        let nextActivityId = state.length;
        //reducer must be pure : return the new state
        switch (action.type) {
            case ActivityEnum.ADD_ACTIVITY:
                return [
                    ...state, {
                        id: nextActivityId,
                        text: action.text,
                        completed:false
                    }
                ]
            case ActivityEnum.CHANGE_ACTIVITY:
                return state.map((activity, index) => {
                    if (index === action.index) {
                        return Object.assign({}, activity, {completed: !activity.completed})
                    }
                    return activity;
                })
            default: return state;
        }
    }


export const visibilityreducer: Reducer<FilterState, FilterAction> =
    (state: FilterState = VisibilityFilters.SHOW_ALL, action: FilterAction): FilterState => {
        console.log("in visibilityreducer " + JSON.stringify(action));

        switch (action.type) {
            case FilterEnum.SET_VISIBILITY_FILTER:
                return action.filter;
            default: return state;
        }
    }

export const messagereducer: Reducer<MessageState, MessageAction> =
    (state: MessageState = "", action: MessageAction): MessageState => {
        console.log("in messagereducer " + JSON.stringify(action));

        switch (action.type) {
            case MessageEnum.SEND_MESSAGE:
                return action.msg;
            default: return state;
        }
    }
export const asyncactionreducer: Reducer<AsyncState, AsyncAction> =
    (state: AsyncState = { isFetching: false, msg:"" }, action: AsyncAction): AsyncState => {
        console.log("in messagereducer " + JSON.stringify(action));

        switch (action.type) {
            case AsyncEnum.ASYNC_REQUEST_START:
                return { isFetching: action.isFetching, msg: action.msg };
            case AsyncEnum.ASYNC_REQUEST_END_SUCCESS:
                return { isFetching: action.isFetching, msg: action.msg };
            case AsyncEnum.ASYNC_REQUEST_END_FAILURE:
                return { isFetching: action.isFetching, msg: action.msg };
            default: return state;
        }
    }

//we conbine all the reducers into single one
export const activityApp = combineReducers({ activities: activityreducer, visibility: visibilityreducer, message: messagereducer, async: asyncactionreducer });