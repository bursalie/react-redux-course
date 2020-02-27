import React from "react";

interface LinkProps { active: boolean, onClick: () => void }

export const Link: React.FC<LinkProps> = (props) => (
    <button onClick={props.onClick} disabled={props.active} style={{ marginLeft: '4px' }}>
        {props.children}
    </button>
)