import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import Button from '@material-ui/core/Button';
import {TextField} from "@material-ui/core";

export type TypeAddItemProps = {
    addItems: (title: string) => void
}

const AddItemForm = React.memo((props: TypeAddItemProps) =>{
    const [title, setTitle] = useState<string>("")
    let [error, setError] = useState<"Title is Required" | null>(null)

    const onChangeHandlerInput = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        if(error){
            setError(null)

        }
    }
    const onKeyHandlerInput = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addItem()
    }
    const addItem = () => {
        const itemTitle = title.trim()
        if (itemTitle) {
            props.addItems(itemTitle)
            setTitle('')
        } else {
            setError('Title is Required')
        }
    }
    return <div>
        <div>
            <TextField
                label="Enter text"
                error={!!error}
                className={error ? 'error' : ""}
                value={title}
                onChange={onChangeHandlerInput}
                onKeyPress={onKeyHandlerInput}
                helperText={error}
            />


            <Button color={"primary"} variant={"contained"} size={"small"} onClick={addItem}>+</Button>
        </div>
    </div>
})

export default AddItemForm;