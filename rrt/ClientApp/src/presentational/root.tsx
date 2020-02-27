import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { App } from "./App"

export const Root: React.FC =() => (
    <Router>
        {/*<Route path="/" component={App} />*/}
        <Route path="/:filter?" component={App} />
    </Router>
)