import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store'

export const store = new Store() as Store

export const Context = createContext({
    store
}) as React.Context<{store : Store}>

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLFormElement) as ReactDOM.Root;
root.render(
    <React.StrictMode>
        <Context.Provider value={{
            store
        }}>
            <App/>
        </Context.Provider>
    </React.StrictMode>
);
