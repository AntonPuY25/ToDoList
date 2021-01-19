import React, {ChangeEvent, useState} from "react";
type TypeEditSpan={
    title:string
    isDone?:boolean
    changeTaskTitle: ( title: string) => void

}

function EditSpan(props:TypeEditSpan){
    const [editMode,setEditMode] = useState<boolean>(false)
    const [text,setText] = useState<string>(props.title)
    const onEditMode = ()=>{setEditMode(true)

    }
    const ofEditMode = ()=>{
        setEditMode(false)
        if(text.trim()){ props.changeTaskTitle(text.trim())}
    }
    const changeText = (e:ChangeEvent<HTMLInputElement>)=>{
        setText(e.currentTarget.value)

    }
    return(
        editMode?<input value={text} onChange={(event)=>{changeText(event)}} autoFocus onBlur={ofEditMode}/>
        : <span onDoubleClick={onEditMode} className={(props.isDone) ? 'is-done' : ""}>{props.title}</span>

    )
}
export default EditSpan;