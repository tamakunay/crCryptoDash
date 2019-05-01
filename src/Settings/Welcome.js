import React from 'react';
import {AppContent} from "../App/AppProvider";

export default function({firstVisit}) {
    return (
        <AppContent.Consumer>
            {({firstVisit}) =>
                firstVisit ? <div>
                    Welcome to CryptoDash, please select your favorite coins to begin. {' '}
                </div> : null
            }
        </AppContent.Consumer>
    )
}