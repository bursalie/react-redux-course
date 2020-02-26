import { AddActivityContainer } from "../container/AddActivityContainer";
import React from "react";
import { ActivityListContainer } from "../container/ActivityListContainer";
import { Footer } from "./footer";
import { PrintInfoContainer } from "../container/PrintInfoContainer";
import { SpinnerContainer } from "../container/SpinnerContainer";

export const App: React.FC = () => (
    <div>
        <AddActivityContainer />
        <SpinnerContainer />
        <PrintInfoContainer filter="..." />
        <ActivityListContainer />
        <Footer />
    </div>
    )