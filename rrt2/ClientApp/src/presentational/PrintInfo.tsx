import { MessageState } from "../typesandconst/typesandconst";
import React from "react";
/*
export interface PrintInfoProps {
    msg: MessageState,
    send: (m: string) => void
}
*/

export interface PrintInfoProps {
    msg: MessageState
}

export interface PrintInfoDispatchProps {
    send: (m: string) => void
}

export const PrintInfo: React.FC<PrintInfoProps & PrintInfoDispatchProps> = props => {
    return (
        <div>
           <h2> {props.msg}</h2>
            <button onClick={() => props.send("####")}>Send</button>
        </div>
    )

}