import React, {useContext, useState} from 'react';
import cl from './ScriptCard.module.css'
import ScriptService from "../../../../services/ScriptService";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import Editor from "../../Editor/Editor";
import AutoSaver from "../../../AutoSaver";
import ScriptName from "./ScriptName";

const ScriptCard = ({sc: index} : {sc: number}) => {
    const {store} = useContext(Context);
    const [showEditor, setShowEditor] = useState(false)
    let autoSaver = new AutoSaver((data: string) => {
        let script = {...store.scripts[index]}
        script.content = data
        ScriptService.UpdateScript(script).then((newScript) => {
            // TODO: overwrite script
        })
    }, null)
    return (
        <div className={cl.card}>
            <div className={cl.header}>
                <ScriptName name={store.scripts[index].name} index={index}/>
                <div className={cl.side}>
                    <img src={"./expand.png"} className={cl.icon} onClick={
                        (e) => {
                            setShowEditor(!showEditor)
                        }
                    }/>
                    <img src={"./settings.png"} className={cl.icon} onClick={
                        (e) => { // TODO: script's settings
                        }
                    }/>
                    <img src={"./delete.png"} className={cl.icon} alt={"X"} onClick={
                        (e) => {
                            ScriptService.RemoveScript(store.scripts[index].id).then(r => {
                                store.setScripts(store.scripts.filter((el) => {return el.id !== store.scripts[index].id}))
                            });
                        }
                    }/>
                </div>
            </div>
            {
                showEditor
                    ?
                    <Editor sid={store.scripts[index].id} code={store.scripts[index].content} autoSaveCallback={(value: string) => {
                        autoSaver.updateSaver(value)
                    }}/>
                    :
                    null
            }
        </div>
    );
};

export default observer(ScriptCard);