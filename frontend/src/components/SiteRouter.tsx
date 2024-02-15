import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CollectionsPage from "../pages/CollectionsPage";
import ScriptsPage from "../pages/ScriptsPage";

const SiteRouter = () => {
    const {store} = useContext(Context);
    return (
            store.isAuth
            ?
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/auth" element={<AuthPage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/collections" element={<CollectionsPage/>} />
                <Route path="/scripts" element={<ScriptsPage/>} />
            </Routes>
            :
            <Routes>
                <Route path="/*" element={<AuthPage/>} />
            </Routes>
    );
};

export default observer(SiteRouter);