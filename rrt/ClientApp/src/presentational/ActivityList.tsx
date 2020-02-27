import React from "react";
import { Activity } from "../typesandconst/typesandconst";
import { ActivityItem } from "./ActivityItem";
interface ActivityListProps {
    activities: Activity[],
    change: (activity:Activity) =>void
}

export const ActivityList: React.FC<ActivityListProps> = ({ activities, change }) => {
    return (
        <ul>
            {
                activities.map(activity => (
                <ActivityItem key={activity.id} {...activity} onClick={() => change(activity)} />
                ) )
            }
    </ul>)
}