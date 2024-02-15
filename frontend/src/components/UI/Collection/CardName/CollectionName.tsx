import React, {useContext, useState} from 'react';
import Popup from 'reactjs-popup';
import cl from './CollectionName.module.css'
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import CollectionService from "../../../../services/CollectionService";

const CollectionName = ({name, index}: {name: string, index: number}) => { // TODO: combine CollectionName/ScriptName.module.css and other css files
    const {store} = useContext(Context);
    const [newName, setNewName] = useState("")
    return <div className={cl.header}>
        <Popup
            trigger=
                {
                    <div className={cl.name}>
                        <img src={"./edit.png"} width={32} style={{userSelect: "none"}}/>
                        {name}
                    </div>
                }
            position="bottom left"
            on={"hover"}
            onOpen={() => {
                setNewName(name);
            }}
            onClose={() => {
                if (newName !== "") {
                    let newCollection = {...store.collections[index]};
                    newCollection.name = newName
                    CollectionService.UpdateCollection(newCollection)
                    store.setCollections(store.collections.map((el, i) => {
                        if (i === index) {
                            return newCollection;
                        }
                        return el;
                    }))
                    setNewName("")
                }
            }}
        >
            <div className={cl.popup}>
                <input value={newName} style={{fontSize: 32}} onChange={(event) => {
                    setNewName(event.target.value)
                }}/>
            </div>
        </Popup>
    </div>
};

export default observer(CollectionName);