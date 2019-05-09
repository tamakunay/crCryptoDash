import React from 'react'
import styled from 'styled-components'
import {backgroundColor2, fontSize2} from "../Shared/Styles";
import {AppContent} from "../App/AppProvider";
import _ from 'lodash';
import fuzzy from 'fuzzy'

const SearchGrid = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr
`;

const SearchInput = styled.input`
    ${backgroundColor2}
    ${fontSize2}
    border: 1px solid;
    height: 30px;
    color: #eee;
    place-self: center left;
`;

function filterCoins(e, setFilteredCoins, coinList) {
    let inputValue = e.target.value;
    if(!inputValue) {
        setFilteredCoins(null);
        return;
    }
    handleFilter(inputValue, coinList, setFilteredCoins)
}

const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
    //Get all coin symbols
    let coinSymbols = Object.keys(coinList);
    //get all the coin names, map symbol to the name
    let coinNames= coinSymbols.map(sym => coinList[sym].CoinName);
    let allStringsToSearch = coinSymbols.concat(coinNames);

    let fuzzyResults = fuzzy
        .filter(inputValue, allStringsToSearch, {})
        .map(result => result.string);

    let filteredCoins = _.pickBy(coinList, (result, symKey) => {
        let coinName = result.CoinName;

        return (
            _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)
        );
    });

    // console.log(filteredCoins);
    setFilteredCoins(filteredCoins)

}, 500);

export default function() {
    return(
        <AppContent.Consumer>
            {({setFilteredCoins, coinList}) =>
                <SearchGrid>
                    <h2>Search for coins</h2>
                    <SearchInput onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}/>
                </SearchGrid>
            }
        </AppContent.Consumer>

    )
}