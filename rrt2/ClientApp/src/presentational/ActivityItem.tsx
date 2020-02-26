import React from "react";

interface ActivityItemProps {
    onClick: () => void,
    completed: boolean,
    text?: string
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ onClick, completed, text }) => (
    <li onClick={onClick} style={{ textDecoration: completed ? 'line-through' : 'none' }}>
       <h2> {text} </h2>
    </li>
)