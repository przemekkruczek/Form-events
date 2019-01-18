import React from 'react';

export class Header extends React.Component {
    render() {
        return (
            <header className='header'>
                <div className='header__grid'></div>
                <div className='header__logo'><h1 className='header__logo-title'>New event</h1></div>
            </header>
        )
    }
}