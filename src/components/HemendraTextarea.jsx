import React from 'react'
import { InputTextarea } from 'primereact/inputtextarea';
import { useState } from 'react';

const HemendraTextarea = React.forwardRef((props, ref) => {
    //const element = props.element;
    const {element, meta, setMeta} = props;
    const [value, setValue] = useState(element.value || "");

    const handleChange = (e) => {
        setValue(e.target.value);
        element.value = e.target.value;
    }

    return(
        <>
            <InputTextarea
                ref={ref}
                maxLength={element?.attributes?.maxLength}
                rows={element?.attributes?.rows}
                cols={element?.attributes?.cols}
                placeholder={element?.attributes?.placeholder}
                name={props.name} 
                id={props.name}
                value={value} 
                onChange={handleChange}/>
        </>
    )
})

export default HemendraTextarea;