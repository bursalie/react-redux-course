import React from "react"

type Props = {
    label: string;
    initialCount: number;
}


//component as a function - no lifecycle- no state
//stateless component
export function Welcome(props: Props) {
    return <h1>...{props.initialCount + " " + props.label}</h1>
}
