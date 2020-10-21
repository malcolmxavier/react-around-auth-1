import React from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';

function AddPlacePopup(props) {
    const [cardName, setCardName] = React.useState("");
    const [cardLink, setCardLink] = React.useState("");


    function handleCardNameChange(e) {
        setCardName(e.target.value)
    }
    function handleCardLinkChange(e) {
        setCardLink(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: cardName,
            link: cardLink,
        });

    }
    return (
        <PopupWithForm handleSubmit={handleSubmit} name="gallery-add" title="New Place" buttonText="Create" isOpen={props.isOpen} onClose={props.onClose}>
            <Input name="name" handleChange={handleCardNameChange} type="text" defaultValue="" />
            <Input name="link" handleChange={handleCardLinkChange} type="url" defaultValue="" />
        </PopupWithForm>
    )
}

export default AddPlacePopup