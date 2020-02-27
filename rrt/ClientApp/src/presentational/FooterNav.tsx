import { FilterLinkNav } from "./FilterLinkNav";
import { VisibilityFilters } from "../actions/actions";
import React from "react";

export const FooterNav = () => (
    <span>
    <FilterLinkNav filter={VisibilityFilters.SHOW_ALL}> All
    </FilterLinkNav>
        <FilterLinkNav filter={VisibilityFilters.SHOW_ACTIVE}> Active
    </FilterLinkNav>
        <FilterLinkNav filter={VisibilityFilters.SHOW_COMPLETED}> Completed
    </FilterLinkNav>
    </span>
    )