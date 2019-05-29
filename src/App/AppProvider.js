import React from 'react';
import _ from 'lodash';
import moment from 'moment';

const cc = require('cryptocompare');
export const AppContent = React.createContext();
const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            timeInterval: 'months',
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredCoins: this.setFilteredCoins,
            setCurrentFavorite: this.setCurrentFavorite,
            changeChartSelect: this.changeChartSelect
        }
    }

    componentDidMount = () => {
        this.fetchCoins();
        this.fetchPrices();
        this.fetchHistorical()
    };

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
        // console.log(coinList)
    };

    fetchPrices = async () => {
        if(this.state.firstVisit) return ;
        let prices = await this.prices();
        // console.log(prices);
        this.setState({prices});
    };

    fetchHistorical = async () => {
        if(this.state.firstVisit) return;
        let results = await this.historical();
        // console.log('results ', results)
        let historical = [
            {
                name: this.state.currentFavorite,
                data: results.map((ticker, index) => [
                    moment().subtract({[this.state.timeInterval]: TIME_UNITS - index}).valueOf(),
                    ticker.USD
                ])
            }
        ]

        this.setState({historical})
    }


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

    historical = () => {
        let promises = [];
        for(let units = TIME_UNITS; units > 0; units--) {
            promises.push(
                cc.priceHistorical(
                    this.state.currentFavorite,
                    ['USD'],
                    moment().subtract({[this.state.timeInterval]: units}).toDate()
                )
            )
        }
        return Promise.all(promises)
    }


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
        let currentFavorite = this.state.favorites[0];
        this.setState({
            firstVisit: false,
            page: 'dashboard',
            currentFavorite,
            prices: null,
            historical: null
        }, () => {
            this.fetchPrices();
            this.fetchHistorical();
        });
        localStorage.setItem('cryptoDash', JSON.stringify({
            favorites: this.state.favorites,
            currentFavorite
        }))
    };

    setCurrentFavorite = (sym) => {
        this.setState({
            currentFavorite: sym,
            historical: null
        }, this.fetchHistorical);

        localStorage.setItem('cryptoDash', JSON.stringify(
            {...JSON.parse(localStorage.getItem('cryptoDash')),
                currentFavorite: sym
            }))
    };

    savedSettings()
    {
        let cryptodashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if(!cryptodashData){
            return {page: 'settings', firstVisit: true}
        }
        let {favorites, currentFavorite} = cryptodashData;
        return {favorites, currentFavorite};

    }
    setPage = page => this.setState({page});

    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins});

    changeChartSelect = (value) => {
        // console.log(value);
        this.setState({
            timeInterval: value,
            historical: null
        }, this.fetchHistorical)
    }

    render(){
        return (
            <AppContent.Provider value={this.state}>
                {this.props.children}
            </AppContent.Provider>
        )
    }
}