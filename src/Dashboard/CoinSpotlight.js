import React from 'react';
import styled from 'styled-components';
import {Tile} from "../Shared/Tile";
import {AppContent} from "../App/AppProvider";
import CoinImage from '../Shared/CoinImage';

const SpolightName = styled.h2`
    text-align: center;
`;

export default function () {
    return (
        <AppContent.Consumer>
            {({currentFavorite, coinList}) =>
                <Tile>
                    <SpolightName>{coinList[currentFavorite].CoinName}</SpolightName>
                    <CoinImage spotlight coin={coinList[currentFavorite]}/>
                </Tile>}
        </AppContent.Consumer>

    )
}
