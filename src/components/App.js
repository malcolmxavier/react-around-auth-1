import React, { useState, useEffect } from 'react';
import {
  Route, Switch, useHistory, Redirect
} from 'react-router-dom';
import Footer from './Footer.js';
import Main from './Main.js';
import Api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCardLink, setSelectedCardLink] = useState('');
  const [selectedCardName, setSelectedCardName] = useState('');
  const [currentUser, setCurrentUser] = useState({ name: "", about: "", avatar: "" });
  const [cards, setCards] = useState([]);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState('');
  const history = useHistory();
  const api = new Api({
    baseUrl: "https://api.jennatoff.students.nomoreparties.site",
    headers: {
        authorization: token,
        "content-type": "application/json"
    }
});

  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));

    api.getCardList()
      .then((res) => setCards(res))
      .catch((err) => console.log(err));
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          setToken(jwt);
        })
        .then(() => history.push('/'))
        .catch((err) => console.log(err));
    }
  }, []);

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
      .then(() => { cards.filter((card) => card !== deletedCard) })
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
  function handleSignup(password, email) {
    auth.register(password, email)
      .then((res) => {
        if (res.error) {
          setIsSuccessful(false);
          setIsInfoTooltipOpen(true);
        } else {
          setIsSuccessful(true);
          setIsInfoTooltipOpen(true);
          history.push('/signin');
        }
      })
      .catch((err) => console.log(err));
  };
  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt')
    auth.checkToken(jwt)
      .then((res) => {
        setUserEmail(res.data.email);
        setLoggedIn(true);
        setToken(jwt);
      })
      .then(() => history.push('/'))
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      })
  }

  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then(() => {
        handleTokenCheck()
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      })
  };


  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
    history.push('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">

          <Switch>
            <ProtectedRoute exact path='/'
              signOut={handleSignOut}
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
              <Header link="/signup" linkText="Sign up" />
              <Login handleLogin={handleLogin} />
            </Route>

            <Route path="/signup">
              <Header link="/signin" linkText="Sign In" />
              <Register handleSignup={handleSignup} />
            </Route>
            <Route path="/*">
              <Redirect to="/signin" />
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
  )
}

export default App;
