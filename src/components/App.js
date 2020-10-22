import React, { useState, useEffect } from 'react';
import {
  Route, Switch, useHistory
} from 'react-router-dom';
import Footer from './Footer.js';
import Main from './Main.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../auth';

function App() {
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCardLink, setSelectedCardLink] = useState('');
  const [selectedCardName, setSelectedCardName] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('')
  const jwt = localStorage.getItem('jwt');
  const history = useHistory();
  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));

    api.getCardList()
      .then((res) => setCards(res))
      .catch((err) => console.log(err));

    auth.checkToken(jwt)
      .then((res) => {
        setUserEmail(res.data.email);
        setLoggedIn(true);
      })
      .then(() => history.push('/'))
      .catch((err) => console.log(err));
  }, [cards]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(deletedCard) {
    api.removeCard(deletedCard._id)
      .then(cards.filter((card) => card !== deletedCard))
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(name, about) {
    api.setUserInfo({ name, about })
      .then(() => setCurrentUser({
        name,
        about,
        avatar: currentUser.avatar
      }))
      .then(() => setIsEditProfileOpen(false))
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar({ avatar })
      .then(() => {
        setCurrentUser({
          name: currentUser.name,
          about: currentUser.about,
          avatar,
        });
      })
      .then(() => setIsEditAvatarOpen(false))
      .catch((err) => console.log(err));
  }
  function handleAddPlace(newCard) {
    api.addCard({ name: newCard.name, link: newCard.link })
      .then(() => setIsAddPlaceOpen(false))
      .catch((err) => console.log(err));
  }

  function handleCardClick(link, name) {
    setSelectedCardLink(link);
    setSelectedCardName(name);
    setIsImagePopupOpen(true);
  }

  const handleEditAvatarClick = (e) => {
    setIsEditAvatarOpen(true);
  };

  const handleEditProfileClick = (e) => {
    setIsEditProfileOpen(true);
  };

  const handleAddPlaceClick = (e) => {
    setIsAddPlaceOpen(true);
  };
  const closeAllPopups = (e) => {
    if (e.target !== e.currentTarget) return;
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
    setSelectedCardName('');
    setSelectedCardLink('');
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };
  function handleSignup(state) {
    setIsSuccessful(state)
    setIsInfoTooltipOpen(true)
    setLoggedIn(state)
  }
  function handleLogin() {
    if (localStorage.getItem('jwt')) {
      auth.checkToken(jwt)
        .then((res) => {
          setUserEmail(res.data.email)
        })
        .catch((err) => console.log(err));
    }

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">

          <Switch>
            <ProtectedRoute exact path='/'
              loggedIn={loggedIn}
              component={Main}
              userEmail={userEmail}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={(data) => handleCardClick(data)}
              onClose={closeAllPopups}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              handleCardClick={handleCardClick}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete} />
            <Route path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>

            <Route path="/signup">
              <Register handleSignup={handleSignup} />
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfileOpen} onClose={closeAllPopups} />
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarOpen} onClose={closeAllPopups} />
          <AddPlacePopup onAddPlace={handleAddPlace} isOpen={isAddPlaceOpen} onClose={closeAllPopups} />
          <ImagePopup isOpen={isImagePopupOpen} name={selectedCardName} link={selectedCardLink} onClose={closeAllPopups} />
          <InfoTooltip valid={isSuccessful} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
