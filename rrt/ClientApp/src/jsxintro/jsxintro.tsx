import React from "react";
import ReactDOM from "react-dom";
import { type } from "os";
import { Welcome } from "./welcome";

export function jsxtest() {
    console.log("in jsxtest");
    const rootElement = document.getElementById('root');
    const containerElement = document.getElementById('container');

    interface User {
        firstName: string
        lastName: string

    }

    function formatName(user: User) {
        return user.firstName + ' ' + user.lastName;
    }
    const user: User = {
        firstName: "Emin",
        lastName: "Bursali"
    }
    //JSX Element
    const element = (
        <h1>
            Startup, { formatName(user) }
        </h1>
    );

    //JSX can be everywhere:conditional rendering
    function getStartup(user: User) {
        if (user)
            return (<h1>
                Startup, {formatName(user)}
            </h1>)
        return(<div> Startup </div>)
    }

    //JSX as value for attributes
    const element1 = <img src={user.firstName}></img>
    const element2 = <div tabIndex={0}></div>

    //JSX no injection attacks
    const title='<div>OK</div>'
    const element3 = <h1>{title}</h1>

    //without JSX
    const element4 = (<h1 className="startup">Startup</h1>)
    const element5 = React.createElement('h1', {className:'startup'},'Startup')

    //compare with a component
    /*
    class Startup extends React.Component {
        render() {
            return (<p>Startup in Component</p>)
        }
    }
    */

    //properties represents a way to configure component
    //component as a class
    class Startup extends React.Component<{ startup:string}> {
        render() {
            //props are readonly
            //this.props.startup = "new value"

            return (<div><p>Startup in Component {this.props.startup}</p> {this.props.children}</div>)
        }
    }
    type Props = {
        label: string;
        initialCount: number;
    }

    type State = { count: number;}

    class Component1 extends React.Component<Props, State> {
        static defaultProps = { label: "label1", initialCount: 0 }
        constructor(props: Props) {
            super(props);
            this.state = { count: 0 }
            console.log("in constructor");
        }
        render() {
            return (<div>{this.props.label} - {this.state.count}</div>)
        }
    }

   
    //composability - root component
    function App() {
        return (
            <div>
                <Welcome label="label1" initialCount={0} />
                <Welcome label="label2" initialCount={1} />
                <Welcome label="label3" initialCount={2} />
            </div>
            )
    }
    //ReactDOM.render(<App/>, rootElement);
    //ReactDOM.render(element4, rootElement);
    //ReactDOM.render(element5, containerElement);
    //ReactDOM.render(<div>
    //    <Startup startup="ok1" />
    //    <Startup startup="ok2" />
    //    <Startup startup="ok3">...</Startup>
    //</div>, containerElement);
   // ReactDOM.render(<Component1 label="label1"/>, containerElement);


    //properties routing
    class Display extends React.Component<{ color: string, num: string }>{
        render() { return (<div><p>{this.props.color}</p><p>{this.props.num}</p></div>) }
    }
    /*
    class Label extends React.Component<{ color: string, num: string }>{
        render() {
            return (<div>Label : <Display color={this.props.color} num={this.props.num} /></div>) }
    }*/
    class Label extends React.Component<{ color: string, num: string }>{
        render() {
            return (<div><h3>Label :</h3> <Display {...this.props} /></div>) //spread operator
        }
    }
    /* class Square extends React.Component<{ color: string, num: string }>{
        render() {
            return (<div>Square : <Label color={this.props.color} num={this.props.num}/></div>)
        }
    } */
    class Square extends React.Component<{ color: string, num: string }>{
        render() {
            return (<div><h1>Square :</h1> <Label {...this.props} /></div>)//spread operator
        }
    }
    //ReactDOM.render(<Square color="red" num= "1"/>, containerElement);
    type Props1 = {
        className?: string,
        style?: React.CSSProperties
    }

    const FCSpreadAttributes: React.FC<Props1> = (props) => {
        const { children, ...restProps } = props;
        return <div {...restProps}>{children} </div>
    }
    //ReactDOM.render(<FCSpreadAttributes className={"fb fb-a"} style={{ backgroundColor: "lightgrey", width:"50%" }}>...</FCSpreadAttributes>, containerElement);

    //to avoid property routing we use Context

    //context decleration
    const ThemeContext = React.createContext("light");
    class Display1 extends React.Component<{ theme: string}>{
        render() {
            return (<div><p>{this.props.theme}</p></div>)
        }
    }
    class Label1 extends React.Component{
        //context association
        static contextType = ThemeContext;

        render() {
            return (<div><h2>Label :</h2> <Display1 theme={this.context} /></div>) //spread operator
        }
    }
    class Square1 extends React.Component{
        render() {
            return (<div><h1>Square :</h1> <Label1/></div>)//spread operator
        }
    }
    class App1 extends React.Component {
        render() {
            return (
                <ThemeContext.Provider value="dark">
                <Square1 />
                </ThemeContext.Provider>
            )
        }
    }

    ReactDOM.render(<App1/>, containerElement)
}