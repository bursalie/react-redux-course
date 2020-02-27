import React from "react";
import ReactDOM from "react-dom";

export class BuggyCounter extends React.Component<{}, { counter: number }>{

    constructor(props: {}) {
        super(props);
        this.state = { counter: 0 }
        //2) bind this.handleClick
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        // 1) this is undefined
        this.setState(({ counter }) => ({ counter: counter + 1 }))
        /* //alternate error handling
        try {
            throw "Error in event handler!";
        } catch (e) {
            console.log(e);
        }
        */
    }
    //initial rendering - first render
    componentWillMount() {
        console.log("=====> Component WILL Mount <=====");
    }
    render() {
        console.log("===============> In Render! <===================");
        if (this.state.counter === 5)
            throw new Error("Crashed!");
        return <h1 onClick={this.handleClick}>{this.state.counter}</h1>
    }
    componentDidMount() {
        console.log("========>Component DID Mount <========");
    }

    //Phase 2 : Updating phase 
    shouldComponentUpdate(newProps: {}, newState: { counter: number }) {
        if (newState.counter < 3)
            return true;
        else {
            ReactDOM.unmountComponentAtNode(document.getElementById('root') as HTMLDivElement);
            return false;
        }
    }
    componentWillUpdate() { console.log("========>Component WILL UPDATE <========"); }
    componentDidUpdate(currentProps: {}, currentState: { counter: number }) {
        console.log("========>Component DID UPDATE <========" + currentState.counter.toString());
    }
    componentWillUnmount() { console.log("========>Component WILL UNMOUNT <========");}
}