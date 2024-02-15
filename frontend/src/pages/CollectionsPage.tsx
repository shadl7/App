import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {getCollections, getScripts} from "../http";
import {observer} from "mobx-react-lite";
import NewCollection from "../components/UI/Collection/NewCollection/NewCollection";
import CollectionCard from "../components/UI/Collection/CollectionCard/CollectionCard";
import cl from "./CloudPage.module.css"

const CollectionsPage = () => { // TODO: styles
    const {store} = useContext(Context);
    useEffect(() => {
        async function f() {
            store.setCollections(await getCollections((store.user as user).id))
            store.setScripts(await getScripts((store.user as user).id))
        }
        f().then();
    }, []);
    return (
        <div className={cl.cloud_page}>
            <NewCollection/>
            <div className={cl.cloud_list}>
                {
                    store.collections && store.collections.map((col, index) => {
                        return (
                            <CollectionCard key={col.id} index={index}/>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default observer(CollectionsPage);