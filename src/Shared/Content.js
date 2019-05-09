import React from 'react';
import {AppContent} from '../App/AppProvider';

export default function(props) {
    return (
        <AppContent.Consumer>
            {({coinList}) => {
                if(!coinList) {
                    return (
                        <div> Loading Coins</div>
                    )
                }
                return (
                    <div> {props.children}</div>
                )
            }}
        </AppContent.Consumer>
    )
}