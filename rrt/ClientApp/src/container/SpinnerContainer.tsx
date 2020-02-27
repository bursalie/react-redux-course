import { connect } from "react-redux";
import { Spinner } from "../presentational/spinner";
import { State } from "../typesandconst/typesandconst";

const mapStateProps = (state:State) => {
    return {
        msg: state.async?.msg, isFetching: state.async?.isFetching
    }
}
export const SpinnerContainer = connect(mapStateProps)(Spinner);