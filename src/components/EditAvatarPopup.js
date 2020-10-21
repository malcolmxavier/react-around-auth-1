import React, { useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {
    const currentUser = useContext(CurrentUserContext);

    const [avatar, setAvatar] = React.useState(currentUser.avatar);
    const avatarInputRef = React.useRef(avatar);

    function handleAvatarChange() {
        setAvatar(avatarInputRef.current.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(
            avatar
        );
    }
    return (
        <PopupWithForm handleSubmit={handleSubmit} name="picture-change" title="Change profile picture" buttonText="Save" isOpen={props.isOpen} onClose={props.onClose}>
            <input required id="avatar" onChange={handleAvatarChange} name="avatar" placeholder="URL" ref={avatarInputRef} className="popout__form-input popout__form-input_type_avatar" type="url" defaultValue={currentUser.avatar} />
            <span id="avatar-error" className="popout__form-input-error popout__form-input_type_avatar-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup