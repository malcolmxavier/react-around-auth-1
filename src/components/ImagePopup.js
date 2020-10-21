import React from 'react';

function ImagePopup(props) {
    return (
        <section className="popout popout_picture-view">
            <div className={`popout__container popout__container_picture-view ${props.isOpen ? "popout__container_active" : ""}`} onClick={props.onClose}>
                <button className="popout__close-button" onClick={props.onClose}></button>
                <figure className="popout__picture-container">
                    <img className="popout__picture" src={props.link} alt={props.name} />
                    <figcaption className="popout__title">{props.name}</figcaption>
                </figure>
            </div>
        </section>
    )

}
export default ImagePopup