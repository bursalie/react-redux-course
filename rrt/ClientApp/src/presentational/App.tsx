import { AddActivityContainer } from "../container/AddActivityContainer";
import React from "react";
import { ActivityListContainer } from "../container/ActivityListContainer";
import { Footer } from "./footer";
import { PrintInfoContainer } from "../container/PrintInfoContainer";
import { SpinnerContainer } from "../container/SpinnerContainer";
import { FooterNav } from "./FooterNav";
import { match } from "react-router-dom";


interface DetailParams {
    filter:string
}
interface AppProps {
    match?: match<DetailParams>
}

export const App: React.FC<AppProps> = (props) => (
    <div>
        <AddActivityContainer />
        <SpinnerContainer />
        <PrintInfoContainer filter="..." />
        <ActivityListContainer filter={props.match?.params.filter || 'SHOW_ALL' } />
        {/*<Footer />*/}
        <FooterNav />
    </div>
    )