import React from 'react';
import classes from './Navbar.module.css'
import {Link} from "react-router-dom";
const Navbar = () => {
    // TODO: dark themed site
    return (
        <div className={classes.navbar}>
            <Link to="/" className={classes.component}>
                <img src={"./home.svg"} className={classes.icon} alt=""></img>
                Главная
            </Link>
            <Link to="/scripts" className={classes.component}>
                <img src={"./script.png"} className={classes.icon} alt=""></img>
                Сценарии
            </Link>
            <Link to="/collections" className={classes.component}>
                <img src={"./collection.png"} className={classes.icon} alt=""></img>
                Наборы сценариев
            </Link>
            <Link to="profile" className={classes.component}>
                <img src={"./user.svg"} className={classes.icon} alt=""></img>
                Мой аккаунт
            </Link>
        </div>
    );
};

export default Navbar;