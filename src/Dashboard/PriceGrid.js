import React from 'react';
import {AppContent} from "../App/AppProvider";
import styled from 'styled-components';
import PriceTile from './PriceTile'

const PriceGrid = styled.div`
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 15px; 
  margin-top: 40px; 
`;


export default function () {
    return (
        <AppContent.Consumer>
            {({prices}) => (
                <PriceGrid>
                    {prices.map((price, index) => (
                        <PriceTile key={`priceTile-${index}`} index={index} price={price}/>
                    ))}
                </PriceGrid>
            )}
        </AppContent.Consumer>
    );
}