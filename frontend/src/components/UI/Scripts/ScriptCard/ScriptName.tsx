import React, {useContext, useState} from 'react';
import Popup from 'reactjs-popup';
import cl from './ScriptName.module.css'
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import ScriptService from "../../../../services/ScriptService";

const ScriptName = ({name, index}: {name: string, index: number}) => { // TODO: split into another folder
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
                    let newScript = {...store.scripts[index]};
                    newScript.name = newName
                    ScriptService.UpdateScript(newScript)
                    store.setScripts(store.scripts.map((el, i) => {
                        if (i === index) {
                            return newScript;
                        }
                        return el;
                    }))
                    setNewName("")
                }
            }}
        >
            <div className={cl.popup}>
                <img src={"./icon.png"} width={32} style={{userSelect: "none", display: "none"}}/>
                {
                    // TODO: icons for script
                }
                <input value={newName} style={{fontSize: 32}} onChange={(event) => {
                    setNewName(event.target.value)
                }}/>
            </div>
        </Popup>
    </div>
};

export default observer(ScriptName);