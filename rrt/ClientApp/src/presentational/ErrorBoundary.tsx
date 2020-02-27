import React, { ErrorInfo } from "react";

interface ErrorBoundaryState {
    error: Error | null,
    errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState>{

    constructor(props: {}) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ error: error, errorInfo: errorInfo })
    }
    render() {
        if (this.state.error && this.state.errorInfo) {
            return <div>
                Something wrong happened! -
            {this.state.error.toString()} -
            {this.state.errorInfo?.componentStack}
            </div>
        }
        return this.props.children;
    }
}