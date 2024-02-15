import React, {useContext, useState} from 'react';
import cl from './CollectionCard.module.css'
import CollectionService from "../../../../services/CollectionService";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import AutoSaver from "../../../AutoSaver";
import CollectionName from "../CardName/CollectionName";
import ScriptInCollection from "../ScriptInCollection/ScriptInCollection";
import AddScript from "../AddScript/AddScript";

const CollectionCard = ({index} : {index: number}) => {
    const {store} = useContext(Context);
    const [showEditor, setShowEditor] = useState(false)
    let autoSaver = new AutoSaver((data: string[]) => {
        let collection = {...store.collections[index]}
        collection.content = data
        CollectionService.UpdateCollection(collection).then()
    }, null)
    return (
        <div className={cl.card}>
            <div className={cl.header}>
                <CollectionName name={store.collections[index].name} index={index}/>
                <div className={cl.side}>
                    <AddScript index={index}/>
                    <img src={"./expand.png"} className={cl.icon} onClick={
                        (e) => {
                            setShowEditor(!showEditor)
                        }
                    }/>
                    <img src={"./settings.png"} className={cl.icon} onClick={
                        (e) => { // TODO: collection's settings
                        }
                    }/>
                    <img src={"./delete.png"} className={cl.icon} alt={"X"} onClick={
                        (e) => {
                            CollectionService.RemoveCollection(store.collections[index].id).then(r => {
                                store.setCollections(store.collections.filter(
                                    (el) => {return el.id !== store.collections[index].id}
                                ))
                            });
                        }
                    }/>
                </div>
            </div>
            {
                showEditor
                    ?
                    store.collections && store.collections[index].content.map((col, i2) => {
                        return (
                            <ScriptInCollection key={String(col) + String(i2)} col={index} sc={store.scripts.findIndex((el) => {
                                return el.id === col
                            })}/>
                        )
                    })
                    :
                    null
            }
            {
                store.collections[index].content.length === 0 && showEditor
                    ?
                    <div style={{fontSize: "32px"}}>
                        Пусто!
                    </div>
                    :
                    null
            }
        </div>
    );
};

export default observer(CollectionCard);