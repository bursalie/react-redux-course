import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActivityAction, addActivity, addActivityAsync } from "../actions/actions";
import { AddActivity, AddActivityProps } from "../presentational/AddActivity";
//we need dispatch
//const mapDispatchToProps = (dispatch: Dispatch<ActivityAction>) => {
//    return {
//        add: (value: string) => dispatch(addActivity(value))
//    }
//}

//<{},AddActivityProps> 
export const AddActivityContainer = connect(null, { add: addActivityAsync })(AddActivity)