import React from "react";

type MessageProps = {
    className?: string,
    style?: React.CSSProperties
}

export const Message: React.FC<MessageProps> = (props) => {
    const { children, ...restProps } = props;
    return <div {...restProps}><h2>{children}</h2> </div>
}