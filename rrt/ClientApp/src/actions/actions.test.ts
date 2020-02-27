import { ActivityEnum, addActivity, changeActivity, addActivityAsync } from "./actions";
import fetchMock from "fetch-mock"
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store"

describe("testing syncronous action creators", () => {
    it("should create an action to add activity", () => {
        const text = "Doing";
        const expectedAction = { type: ActivityEnum.ADD_ACTIVITY, text }
        expect(addActivity(text)).toEqual(expectedAction);
    })
    it("should create an action to change activity", () => {
        const index = 0;
        const expectedAction = { type: ActivityEnum.CHANGE_ACTIVITY, index }
        expect(changeActivity(index)).toEqual(expectedAction);
    })
});
describe("testing asyncronous action creators", () => {
    //text fixtures
    //beforeeach/aftereach
    afterEach(() => fetchMock.restore());
    it("should create an action to add activity async", () => {
        fetchMock.mock("http://localhost:3500/activities", { body: { text: "Doing", completed: false } });
        const expectActions = [            
            { type: "ASYNC_REQUEST_START", "isFetching": true, "msg": "Requesting Data"},
            { type: "ASYNC_REQUEST_END_SUCCESS", "isFetching": true, "msg": "Done" },
            { type: "ADD_ACTIVITY", text: "Doing" }
        ];
        const mockStore = configureMockStore([thunk]);
        const store = mockStore({ activities: [] });
        addActivityAsync("Doing")(store.dispatch).then(() => { expect(store.getActions()).toEqual(expectActions) });
    });
    it("create ASYNC_REQUEST_END_FAILURE in case of 404", () => {
        fetchMock.mock("http://localhost:3500/activities", { status:404});
        const expectActions = [
            { type: "ASYNC_REQUEST_START", "isFetching": true, "msg": "Requesting Data" },
            { type: "ASYNC_REQUEST_END_FAILURE", "isFetching": true, "msg": "ERROR" }
        ];
        const mockStore = configureMockStore([thunk]);
        const store = mockStore({ activities: [] });
        addActivityAsync("Doing")(store.dispatch).then(() => { expect(store.getActions()).toEqual(expectActions) });
    });
});