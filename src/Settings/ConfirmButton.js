import React from 'react';
import styled from 'styled-components'
import {AppContent} from "../App/AppProvider";
import {fontSize1, greenBoxShadow, color3} from "../Shared/Styles";

const ConfirmButtonStyled = styled.div`
    margin: 20px;
    color: ${color3};
    ${fontSize1};
    padding: 5px;
    cursor: pointer;
    &:hover {
        ${greenBoxShadow}
    }
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