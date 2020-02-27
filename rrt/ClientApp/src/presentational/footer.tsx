import React from "react";
import { VisibilityFilters } from "../actions/actions";
import { FilterLink } from "../container/FilterLink";


export const Footer: React.FC<{}> = () => (
    <div>
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>

        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>

        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>

    </div>
)