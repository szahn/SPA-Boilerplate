import React from "react";
import { Router, Route, Link } from "react-router-dom";
import HomeRoute from './routes/home/homeRoute';
import AuthCallbackRoute from './routes/authCallback/index';
import LogoutRoute from './routes/logout/index';
import history from './history';

export default class AppRouter extends React.Component {

    render(){
        return <Router history={history}>
            <div>
                <Route path="/" exact component={HomeRoute}/>
                <Route path="/home" exact component={HomeRoute}/>
                <Route path="/authCallback" component={AuthCallbackRoute}/>
                <Route path="/logout" exact component={LogoutRoute}/>
            </div>
        </Router>
    }
}