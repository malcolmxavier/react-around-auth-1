import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    ` ${isOwn ? 'gallery__trash-button' : 'gallery__trash-button_hidden'}`
  );
  const isLiked = props.likes.some(i => i._id === currentUser._id)
  const cardLikeButtonClassName = (`gallery__like-button ${isLiked ? 'gallery__like-button_active' : ''}`)
  return (
    <li className="gallery__container">
      {cardDeleteButtonClassName}
      <img className="gallery__image" src={props.link} alt={props.name} onClick={props.onCardClick} /><button onClick={props.onTrashClick} className={cardDeleteButtonClassName}></button>
      <div className="gallery__group"><h3 className="gallery__text"> {props.name}</h3><div className="gallery__like-container"><button onClick={props.onLikeClick} className={cardLikeButtonClassName}></button><p className="gallery__like-count">{props.likes.length}</p></div></div>
    </li>

  )
}
export default Card