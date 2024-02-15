import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ScriptCard from "../components/UI/Scripts/ScriptCard/ScriptCard";
import {getScripts} from "../http";
import NewScript from "../components/UI/Scripts/NewScript/NewScript";
import cl from "./CloudPage.module.css"

const ScriptsPage = () => {
    const {store} = useContext(Context);
    useEffect(() => {
        async function f() {
            store.setScripts(await getScripts((store.user as user).id))
        }
        f();
    }, [store]);
    return (
        <div className={cl.cloud_page}>
            <NewScript/>
            <div className={cl.cloud_list}>
                {
                    store.scripts && store.scripts.map((sc, index) => {
                        return (
                            <ScriptCard key={sc.id} sc={index}/>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default observer(ScriptsPage);