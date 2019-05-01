import React from 'react';

export const AppContent = React.createContext();

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'dashboard',
            ...this.savedSettings(),
            setPage: this.setPage,
            confirmFavorites: this.confirmFavorites
        }
    }

    confirmFavorites = () => {
        // console.log('Hello')
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        });
        localStorage.setItem('cryptoDash', JSON.stringify({
            test: 'hello'
        }))
    }

    savedSettings()
    {
        let cryptodashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if(!cryptodashData){
            return {page: 'settings', firstVisit: true}
        }
        return {};

    }
    setPage = page => this.setState({page});

    render(){
        return (
            <AppContent.Provider value={this.state}>
                {this.props.children}
            </AppContent.Provider>
        )
    }
}