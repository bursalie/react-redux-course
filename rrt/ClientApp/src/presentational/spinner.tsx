import React from "react";

type SpinnerProps = {
    isFetching?: boolean,
    msg?: string
}

export const Spinner: React.FC<SpinnerProps> = props => {
    if (props.isFetching)
        return <div><h2>STARTING {props.msg}</h2> </div>
    else
        return <div><h2>ENDING {props.msg}</h2> </div>

}