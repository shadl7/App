import React, {useContext} from 'react';
import cl from './ScriptInCollection.module.css';
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import CollectionService from "../../../../services/CollectionService";

const ScriptInCollection = ({col, sc}: {col: number, sc: number}) => {
    const {store} = useContext(Context);
    return (
        <div className={cl.main}>
            <div>
                {store.scripts[sc].name}
            </div>
            <img src={"./delete.png"} className={cl.icon} alt={"X"} onClick={
                // FIXME: Duplicate scripts break all
                (e) => {
                    let updCollection = {...store.collections[col]}
                    updCollection.content = updCollection.content.filter((el) => {
                        return el !== store.scripts[sc].id
                    })
                    CollectionService.UpdateCollection(updCollection).then(r => {
                        store.setCollections(store.collections.map((el, index) => {
                            if (index === col)
                                return r.data
                            return el
                        }));
                    })
                }
            }/>
        </div>
    );
};

export default observer(ScriptInCollection);