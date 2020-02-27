import React from "react";
import { NavLink } from "react-router-dom";

interface FilterLinkNavProps {
    filter: string
}

export const FilterLinkNav: React.FC<FilterLinkNavProps> = (props) => (
    <NavLink
        to={props.filter === "SHOW_ALL" ? "/" : "/" + props.filter}
        activeStyle={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
        {props.children}
    </NavLink>
)