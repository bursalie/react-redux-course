import { Action } from "redux"
import { mythunk } from "./logger"

describe("testing middleware", () => {
    it("should pass through non-function action", () => {
        const create = () => {
            const store = {
                getState: jest.fn(() => { })
                , dispatch: jest.fn()
            };
            const next = jest.fn();
            const invoke = (action: Action) => mythunk(store)(next)(action);
            return { store, next, invoke };
        }
        const { next, invoke } = create();
        const action = { type: "TEST" };
        invoke(action);
        expect(next).toBeCalledWith(action);
    })
})