import React from "react";
import style from "./index.css"
import NavvBar from '../../components/navBar/navBarComponent';
import AuthService from '../../services/authService';
import autoBind from 'react-autobind';

export default class HomeRoute extends React.Component{

    constructor(props){
        super(props);
        this.authService = new AuthService();
        autoBind(this);
        
        this.state = {
            isLoggedIn: false
        }
    }

    componentWillMount(){
        const isLoggedIn = this.authService.isAuthenticated();
        this.setState({
            isLoggedIn: isLoggedIn
        });
    }

    onSignUpClicked(){

    }

    onLogoutClicked(){
        this.authService.logout();
        this.setState({
            isLoggedIn: false
        });
    }

    onLoginClicked(){
        this.authService.login();
    }

    render(){
        return <div className={style.router}>
            <NavvBar canSignUp={false}
                canLogIn={!this.state.isLoggedIn}
                canLogOut={this.state.isLoggedIn}
                onLoginClicked={this.onLoginClicked}
                onLogoutClicked={this.onLogoutClicked}/>
            <section className="section container is-fluid">
                <h1>Home</h1>
            </section>
        </div>
    }
}