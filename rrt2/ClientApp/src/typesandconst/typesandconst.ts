export interface Activity {
    id?: number,
    text?: string,
    completed: boolean
}
export type ActivityState = Activity[] | undefined
export type FilterState = string | undefined
export type MessageState = string | undefined
export interface AsyncInfo { isFetching: boolean, msg: string }
export type AsyncState = AsyncInfo | undefined

export interface State {
    activities: ActivityState,
    visibility: FilterState,
    message: MessageState,
    async: AsyncState
}

//api endpoint
export const baseUrl = "http://localhost:3500/activities";