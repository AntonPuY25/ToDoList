import React, {ChangeEvent, useState, KeyboardEvent} from "react";

type TypeAddItemProps = {
    addItems: (title: string) => void
}

function AddItemForm(props: TypeAddItemProps) {
    const [title, setTitle] = useState<string>("")
    let [error, setError] = useState<"Title is Required" | null>(null)

    const onChangeHandlerInput = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
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
            <input className={error ? 'error' : ""}
                   value={title}
                   onChange={onChangeHandlerInput}
                   onKeyPress={onKeyHandlerInput}

            />


            <button onClick={addItem}>+
            </button>
            {error ? <div className={'error-message'}>{error}</div> : null}
        </div>
    </div>
}

export default AddItemForm;