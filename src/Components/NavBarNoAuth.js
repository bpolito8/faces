import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import Popover from 'react-simple-popover';

//Styling imports:
import '../index.css';
import facesLogo from './facesLogoDraftOriginal.png';
import 'font-awesome/css/font-awesome.css';

const activeStyles = {
    color: '#0069d9',
    //fontWeight: 'bold'
}

class NavBarNoAuth extends React.Component {

    render() {

        return (
            <div className="NavBarNoAuth">

                <nav className="navbar navbar-expand-lg navbar-light bg-light">

                    <Link to={"/signIn"} className="navbar-brand mx-auto mobile-only" href="#"><img src={facesLogo} style={{ width: '40px', height: '40px' }} />Faces</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="mr-auto"></ul>
                    <ul className="navbar-nav" style={{ float: 'right', listStyle: 'none' }}>
                            <li className="nav-item" style={{ float: 'right', listStyle: 'none' }}>
                                <Link to="/signIn" className="nav-link">Sign In</Link>
                            </li>
                            {/* <li className="nav-link" style={{ float: 'right', zIndex: '1' }}>
                            <Link to={"/signIn"} className="nav-link">Sign Out</Link>
                                {/* POPOVER STUFF 
                                <a
                                    href="#"
                                    className="button"
                                    ref="target"
                                    onClick={this.handleClick.bind(this)}>Sign Out<span className="sr-only">(current)</span></a>
                            </li> */}
                            
                            
                        </ul>
                    </div>
                </nav>
                
            </div>
        );
    }
}

export default withRouter(NavBarNoAuth);
