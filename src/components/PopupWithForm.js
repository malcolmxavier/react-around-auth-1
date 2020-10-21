import React from 'react';

function PopupWithForm(props) {
    return <section className="popout" >
        <div className={`popout__container popout__container_${props.name} ${props.isOpen ? "popout__container_active" : ""}`} onClick={props.onClose}>
            <button className="popout__close-button" onClick={props.onClose}></button>
            <form onSubmit={props.handleSubmit} className="popout__form" name={props.name}>
                <h2 className="popout__form-text">{props.title}</h2>
                {props.children}
                <button className="popout__button" type="submit" value={props.buttonText}>{props.buttonText}</button>

            </form>
        </div>
    </section>

}

export default PopupWithForm
