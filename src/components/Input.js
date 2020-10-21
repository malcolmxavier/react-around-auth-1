import React from 'react';

function Input(props) {
    return <>
        <input required id={props.name}
            className={`popout__form-input popout__form-input_type_${props.name}`}
            type={props.type}
            name={props.name}
            placeholder={props.name}
            onChange={props.handleChange}
            defaultValue={props.defaultValue} />
        <span id={`${props.name}-error`}
            className={`popout__form-input-error popout__form-input_type_${props.name}-error`} />

    </>
}
export default Input
