import React from 'react';
import {Header} from './Header.jsx';
import {Form} from './Form.jsx';

export class App extends React.Component{
    render(){
        return (
            <div>
                <Header/>
                <Form/>
            </div>
        )
    }
}