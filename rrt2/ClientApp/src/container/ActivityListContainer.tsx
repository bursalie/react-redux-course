import { connect } from "react-redux";
import { ActivityList } from "../presentational/ActivityList";
import { State, Activity } from "../typesandconst/typesandconst";
import { VisibilityFilters, ActivityAction, changeActivity, changeActivityAsync } from "../actions/actions";
import { Dispatch } from "redux";

const getVisibleActivities = (activities: Activity[] | undefined, filter: string | undefined) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL: return activities!;
        case VisibilityFilters.SHOW_COMPLETED: return activities!.filter(activity => activity.completed);
        case VisibilityFilters.SHOW_ACTIVE: return activities!.filter(activity => !activity.completed);
        default: throw new Error("unknown filter: " + filter);
    }
}

const mapStateToProps = (state: State) => {
    console.log("in ActivityListContainer")
    return {
        activities: getVisibleActivities(state.activities, state.visibility)
    }
}
const mapDispatchToProps = (dispatch: Dispatch<ActivityAction>) => {
    return {
        change: (activity: Activity) => dispatch(changeActivity(activity.id))
    }
}

export const ActivityListContainer = connect(mapStateToProps, { change: changeActivityAsync })(ActivityList)