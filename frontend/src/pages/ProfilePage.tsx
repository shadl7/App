import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const ProfilePage = () => {
    const {store} = useContext(Context);

    return (
        <div>
            <h5>ID: {(store.user as user).id}</h5>
            <h5>Электронная почта: {(store.user as user).email}</h5>
            <button onClick={e => {
                e.preventDefault();
                store.logout();
            }}>Выйти из аккаунта</button>
        </div>
    );
};

export default observer(ProfilePage);