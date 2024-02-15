import React, {useContext, useState} from 'react';
import StyledInput from "../../Input/StyledInput";
import {Context} from "../../../../index";
import ScriptService from "../../../../services/ScriptService";
import {observer} from "mobx-react-lite";
import cl from "./NewScript.module.css"

const NewScript = () => {
    const {store} = useContext(Context);
    const [name, setName] = useState('')
    return (
        <div className={cl.new_script}>
            <div style={{fontSize: "32px"}}>
                Сценарии
            </div>
            <div className={cl.right_side}>
                <StyledInput
                    onChange={e => setName(e.target.value)}
                         value={name}
                         type="text"
                         placeholder="Имя сценария"/>
                <button onClick={(e) => { // TODO: add confirm dialog
                    ScriptService.NewScript(name, "", "", (store.user as user).id).then((req) => {
                            store.setScripts([...store.scripts, req.data.script])
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

export default observer(NewScript);