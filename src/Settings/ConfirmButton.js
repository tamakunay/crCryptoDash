import React from 'react';
import styled from 'styled-components'
import {AppContent} from "../App/AppProvider";

const ConfirmButtonStyled = styled.div`
    margin: 20px;
    color: green;
    cursor: pointer;
`;

export const Centerdiv = styled.div`
    display: grid;
    justify-content: center;
`;

export default function() {
    return(
        <AppContent.Consumer>
            {({confirmFavorites}) =>
                <Centerdiv>
                    <ConfirmButtonStyled onClick={confirmFavorites}>
                        Confirm Favorites
                    </ConfirmButtonStyled>
                </Centerdiv>
            }
        </AppContent.Consumer>
    )
}