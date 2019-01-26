import React from "react";
import AuthService from '../../services/authService';

export default class LogoutRoute extends React.Component
{
    constructor(props){
        super(props);
        this.authService = new AuthService();
    }

    componentWillMount(){
        this.authService.handleAuthentication();
    }

    render(){
        return null;
    }
}