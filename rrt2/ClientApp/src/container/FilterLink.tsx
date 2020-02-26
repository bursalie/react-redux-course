import { connect } from "react-redux";
import { FilterAction, setVisibility } from "../actions/actions";
import { Dispatch } from "redux";
import { State } from "../typesandconst/typesandconst";
import { Link } from "../presentational/link";

interface FilterLinkProps {
    filter: string,
children:string}

const mapDispatchToProps = (dispatch: Dispatch<FilterAction>, ownProps: FilterLinkProps) => {
    return { onClick: () => dispatch(setVisibility(ownProps.filter)) }
}

const mapStateToProps = (state: State, ownProps: FilterLinkProps) => {
    return {
        active: ownProps.filter === state.visibility
    }
}


export const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link)