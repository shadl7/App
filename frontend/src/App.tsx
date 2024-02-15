import React, {useContext, useEffect, useMemo} from "react";
import classes from "./App.module.css"
import {BrowserRouter, useParams} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import SiteRouter from "./components/SiteRouter";
import {observer} from "mobx-react-lite";
import {Context} from "./index";

const App = () => {
    const {store} = useContext(Context)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, []);

    if (store.isLoading) {
        return (
            <div className={classes.App}>
                Загрузка....
            </div>
        );
    }

  return (
    <div className={classes.App} style={store.isAuth ? {margin: "0 0 0 130px"} : {}}>
        <BrowserRouter>
            {
                store.isAuth
                    ?
                    <Navbar/>
                    :
                    null
            }
            <SiteRouter/>
        </BrowserRouter>
    </div>
  );
}

export default observer(App);
