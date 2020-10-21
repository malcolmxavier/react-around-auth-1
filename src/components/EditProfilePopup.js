import React, { useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);

    function handleNameChange(e) {
        setName(e.target.value)
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(
            name,
            description,
        );
    }
    return (
        <PopupWithForm handleSubmit={handleSubmit} name="profile-edit" title="Edit profile" buttonText="Save" isOpen={props.isOpen} onClose={props.onClose}>
            <Input handleChange={handleNameChange} name="name" type="text" defaultValue={currentUser.name} />
            <Input handleChange={handleDescriptionChange} name="profession" type="text" defaultValue={currentUser.about} />
        </PopupWithForm>
    )
}

export default EditProfilePopup