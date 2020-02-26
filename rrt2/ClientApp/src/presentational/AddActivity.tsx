import React from "react";
import { Message } from "./Message";
export interface AddActivityProps {
    add:(value:string)=>void
}
type AddActivityState = {
    count:number
}
export class AddActivity extends React.Component<AddActivityProps, AddActivityState>{

    readonly state: AddActivityState = {
        count:0
    }
    render() {
        let input: HTMLInputElement
        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault();
                    if (!input.value.trim())
                        return;
                    this.props.add(input.value);
                    input.value = "";
                    this.setState({ count:this.state.count +1 });
                        }} >
                    <input id="activity" ref={node => { input = node as HTMLInputElement }} />
                    <button id="Add" type="submit" className="btn">Add</button>
                </form>
                <Message style={{ backgroundColor: 'lightgrey' }} >
                    <h4>Inserted {this.state.count} activities today </h4>
                </Message>
                <hr/>
                {this.props.children}
            </div>
            )
    }
}