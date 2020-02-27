import { Activity } from "../typesandconst/typesandconst";

export async function getActivities(url: RequestInfo) {
    let init: RequestInit = { method: "GET" }
    let response = await fetch(url, init);
    let json: Activity[] = await response.json();
    return json;
}
export async function getActivities1(url: RequestInfo, callback?: (json: Activity[])=>void ) {
    let init: RequestInit = { method: "GET" }
    let response = await fetch(url, init);
    let json: Activity[] = await response.json();
    if (callback)
        callback(json);
    return json;
}
export async function addActivityApi(url: RequestInfo, text: string) {
    let activity: Activity = { text: text, completed: false }
    let init: RequestInit = {
        method: "POST",
        body: JSON.stringify(activity),
        headers: { 'Content-Type' : 'application/json'}
    }
    let response = await fetch(url, init);
    let json: Activity = await response.json();
    return json;
}
export async function changeActivityApi(url: RequestInfo, activity: Activity) {
    let newActivity = Object.assign({}, activity);
    newActivity.completed = !newActivity.completed
    let init: RequestInit = {
        method: "PUT",
        body: JSON.stringify(newActivity),
        headers: { 'Content-Type': 'application/json' }
    }
    let response = await fetch(url + "/" + newActivity.id, init);
    let json: Activity = await response.json();
    return json;
}