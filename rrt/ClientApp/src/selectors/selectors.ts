import { State } from "../typesandconst/typesandconst";
import { VisibilityFilters } from "../actions/actions";
import { createSelector } from "reselect"
const getVisibility = (state: State) => state.visibility;
const getActivities = (state: State) => state.activities;

export const getVisibleActivitiesSelector = createSelector([getVisibility, getActivities],
    (visibility, activities) => {
        console.log("#### getVisibleActivitiesSelector");
        switch (visibility) {
            case VisibilityFilters.SHOW_ALL: return activities!;
            case VisibilityFilters.SHOW_COMPLETED: return activities!.filter(activity => activity.completed);
            case VisibilityFilters.SHOW_ACTIVE: return activities!.filter(activity => !activity.completed);
            default: throw new Error("unknown filter: " + visibility);
        }
    });