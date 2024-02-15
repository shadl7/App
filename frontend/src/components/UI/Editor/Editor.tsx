import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/snippets/python";

const Editor = ({sid, code, autoSaveCallback}: {sid: string, code: string, autoSaveCallback : (value: string) => void}) => {
    return (
        <AceEditor
            placeholder=""
            mode="python"
            theme="textmate"
            name={"script_editor_" + sid}
            onLoad={() => {}}
            onChange={autoSaveCallback}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            defaultValue={code}
            width={"100%"}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 4,
            }}/>
    );
};

export default Editor;