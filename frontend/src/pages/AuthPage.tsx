import React, {useContext, useState} from 'react';
import StyledInput from "../components/UI/Input/StyledInput";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import cl from "./AuthPage.module.css"

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {store} = useContext(Context);
    // TODO: view auth error
    return (
        <div className={cl.auth}>
            <div> {/* TODO: remove this div? */}
                <StyledInput
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Электронная почта"/>
                <StyledInput
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    value={password}
                    placeholder="Пароль"/>
                <div className={cl.buttons}>
                    <button onClick={() => store.login(email, password)} className={cl.button}>
                        Войти
                    </button>
                    <button onClick={() => store.registration(email, password)} className={cl.button}>
                        Регистрация
                    </button>
                </div>
            </div>
        </div>
    );
};

export default observer(AuthPage);