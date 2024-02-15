import React, {useContext, useState} from 'react';
import StyledInput from "../../Input/StyledInput";
import {Context} from "../../../../index";
import CollectionService from "../../../../services/CollectionService";
import {observer} from "mobx-react-lite";
import cl from './NewCollection.module.css'

const NewCollection = () => {
    const {store} = useContext(Context);
    const [name, setName] = useState('')
    return (
        <div className={cl.new_collection}>
            <div style={{fontSize: "32px"}}>
                Наборы сценариев
            </div>
            <div className={cl.right_side}>
                <StyledInput
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                         value={name}
                         type="text"
                         placeholder="Имя коллекции"/>
                <button onClick={(e) => { // TODO: add confirm dialog
                    CollectionService.NewCollection(name, [], (store.user as user).id).then((req) => {
                            store.setCollections([...store.collections, req.data.collection])
                        }
                    );
                    setName("")
                }}>
                    <img src={"./add.png"} width={12}/>
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default observer(NewCollection);