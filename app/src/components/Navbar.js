import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { AuthContext } from '../context/AuthContext';

const Navbar = props => {
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);


    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }



    const unauthenticatedNavBar = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>
                <Link to="/login">
                    <li className="nav-item nav-link">
                        Login
                    </li>
                </Link>
                <Link to="/register">
                    <li className="nav-item nav-link">
                        Register
                    </li>
                </Link>
            </>
        )
    }

    const authenticatedNavBar = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>
                <Link to="/profile">
                    <li className="nav-item nav-link">
                        Profile
                    </li>
                </Link>
                <Link to="/myQuestions">
                    <li className="nav-item nav-link">
                        My Questions
                    </li>
                </Link>
                <Link to="/ask">
                    <li className="nav-item nav-link">
                        Ask
                    </li>
                </Link>
                <button type="button"
                    className="btn btn-link nav-item nav-link"
                    onClick={onClickLogoutHandler}>Logout</button>


            </>
        )
    }
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/">
                <div className="navbar-brand">AskIt</div>
            </Link>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
                </ul>
            </div>
        </nav>

    )



}
export default Navbar;