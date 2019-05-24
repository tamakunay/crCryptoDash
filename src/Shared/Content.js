import React from 'react';
import {AppContent} from '../App/AppProvider';

export default function(props) {
    return (
        <AppContent.Consumer>
            {({coinList, prices, firstVisit}) => {
                if(!coinList) {
                    return (
                        <div> Loading Coins</div>
                    )
                }
                if(!firstVisit && !prices) {
                    return (
                        <div> Loading Prices</div>
                    )
                }
                return (
                    <div> {props.children}</div>
                )
            }}
        </AppContent.Consumer>
    )
}