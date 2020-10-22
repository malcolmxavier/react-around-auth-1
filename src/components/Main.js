import React, { useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import {
  useHistory
} from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
import Header from './Header';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    const history = useHistory();
    function signOut(){
      localStorage.removeItem('jwt');
      history.push('/signin');
    }
    return (
        <>
        <Header email={props.userEmail} link="/signin" linkText="Logout" onClick={signOut}/>
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__picture_overlay">
                        <img className="profile__picture" src={currentUser.avatar} alt={currentUser.name} onClick={props.onEditAvatar} />
                    </div>
                    <div className="profile__name-line">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" onClick={props.onEditProfile}></button>
                    </div>

                    <p className="profile__profession">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>

            <section className="gallery">
                <ul className="gallery__grid">
                    {props.cards.map((card, index) => {
                        return (
                            <Card
                                key={index}
                                link={card.link}
                                name={card.name}
                                onCardClick={() => props.handleCardClick(card.link, card.name)}
                                likes={card.likes}
                                _id={card._id}
                                owner={card.owner}
                                onTrashClick={() => props.handleCardDelete(card)}
                                onLikeClick={() => props.handleCardLike(card)} />);
                    })}
                </ul>
            </section>


            <PopupWithForm name="delete" title="Are you sure?" buttonText="Yes" />
        </>
    )
}
export default Main
