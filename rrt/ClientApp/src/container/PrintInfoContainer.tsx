import { connect, MapStateToPropsParam, MapDispatchToPropsParam } from "react-redux";
import { PrintInfo, PrintInfoProps, PrintInfoDispatchProps } from "../presentational/PrintInfo";
import { State } from "../typesandconst/typesandconst";
import { Dispatch } from "redux";
import { MessageAction, sendMessage } from "../actions/actions";
/*
const mapStateToProps = (state: State) =>{
    return { msg: state.message }
}
*/

export interface PrintInfoContainerProps { filter:string }
/*
const mapStateToProps: MapStateToPropsParam<PrintInfoProps, {}, State> = (state) => {
    return { msg: state.message }
}
*/
const mapStateToProps: MapStateToPropsParam<PrintInfoProps, PrintInfoContainerProps, State> = (state, ownProps) => {
    return {
        msg: state.message?.concat(ownProps.filter)
    }
}

const mapDispatchToProps: MapDispatchToPropsParam<PrintInfoDispatchProps, PrintInfoContainerProps> =
    (dispatch: Dispatch<MessageAction>, ownProps: PrintInfoContainerProps) => {
        return {
            send: (m: string) => dispatch(sendMessage(m))
        }
}
//strictly type
export const PrintInfoContainer = connect<PrintInfoProps, PrintInfoDispatchProps, PrintInfoContainerProps, State>(mapStateToProps, mapDispatchToProps)(PrintInfo);