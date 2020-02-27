import { AddActivityContainer } from "../container/AddActivityContainer";
import React from "react";
import { ActivityListContainer } from "../container/ActivityListContainer";
import { Footer } from "./footer";
import { PrintInfoContainer } from "../container/PrintInfoContainer";
import { SpinnerContainer } from "../container/SpinnerContainer";
import { FooterNav } from "./FooterNav";
import { match } from "react-router-dom";
import { BuggyCounter } from "./BuggyCounter";
import { ErrorBoundary } from "./ErrorBoundary";


interface DetailParams {
    filter:string
}
interface AppProps {
    match?: match<DetailParams>
}

export const App: React.FC<AppProps> = (props) => (
    <div>
        <ErrorBoundary>
            <AddActivityContainer />
            <SpinnerContainer />
            <PrintInfoContainer filter="..." />
            <ActivityListContainer filter={props.match?.params.filter || 'SHOW_ALL' } />
            {/*<Footer />*/}
            <FooterNav />
            <BuggyCounter />
            <ErrorBoundary>
                <BuggyCounter />
                <BuggyCounter />
            </ErrorBoundary>
        </ErrorBoundary>
    </div>
    )