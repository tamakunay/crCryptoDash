import React from 'react'
import {AppContent} from "../App/AppProvider";
import {SelectableTile, DeletableTile, DisabledTile} from "../Shared/Tile";
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

function clickCoinHandler(topSection, coinKey, addCoin, removeCoin){
    return topSection ? () => {
        removeCoin(coinKey)
    } : () => {
        addCoin(coinKey)
    }
}

export default function({coinKey, topSection}) {

    return (
        <AppContent.Consumer>
        {({coinList, addCoin, removeCoin, isInFavorites}) => {
            let coin = coinList[coinKey];
            let TileClass = SelectableTile;
            if(topSection) {
                TileClass = DeletableTile
            }else if(isInFavorites(coinKey)) {
                TileClass = DisabledTile
            }

            return <TileClass onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}>
                <CoinHeaderGrid name={coin.CoinName} symbol={coin.Symbol} topSection={topSection}/>
                <CoinImage coin={coin}/>
            </TileClass>
        }}
    </AppContent.Consumer>
    )
}