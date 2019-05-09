import React from 'react';
import {AppContent} from "../App/AppProvider";

export default function ({name, children}) {
    return (
        <AppContent.Consumer>
            {({page}) => {
                if(page !== name) {
                    return null;
                }
                return <div>{children}</div>
            }}
        </AppContent.Consumer>
    )
}
