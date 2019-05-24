import React from 'react';
import _ from 'lodash';

const cc = require('cryptocompare');


export const AppContent = React.createContext();

const MAX_FAVORITES = 10;

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredCoins: this.setFilteredCoins
        }
    }

    componentDidMount = () => {
        this.fetchCoins();
        this.fetchPrices();
    };

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
        console.log(coinList)
    };

    fetchPrices = async () => {
        if(this.state.firstVisit) return ;
        let prices = await this.prices();
        console.log(prices);
        this.setState({prices});
    };

    prices = async () => {
        let retunData = [];
        for(let i = 0; i < this.state.favorites.length; i++) {
            try {
                let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
                retunData.push(priceData)
            } catch (e) {
                console.warn('Fetch price error: ', e)
            }
        }
        return retunData;
    };
    addCoin = key => {
        let favorites = [...this.state.favorites];
        if(favorites.length < MAX_FAVORITES) {
            favorites.push(key);
            this.setState({favorites})
        }
    };

    isInFavorites = key => _.includes(this.state.favorites, key);

    removeCoin = key => {
        let favorites = [...this.state.favorites];
        this.setState({favorites: _.pull(favorites, key)})
    };

    confirmFavorites = () => {
        // console.log('Hello')
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        }, () => {
            this.fetchPrices()
        });
        localStorage.setItem('cryptoDash', JSON.stringify({
            favorites: this.state.favorites
        }))
    };

    savedSettings()
    {
        let cryptodashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if(!cryptodashData){
            return {page: 'settings', firstVisit: true}
        }
        let {favorites} = cryptodashData;
        return {favorites};

    }
    setPage = page => this.setState({page});

    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins});

    render(){
        return (
            <AppContent.Provider value={this.state}>
                {this.props.children}
            </AppContent.Provider>
        )
    }
}