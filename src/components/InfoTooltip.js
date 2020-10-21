import React from 'react';
import success from '../images/success.png';
import fail from '../images/fail.png';

function InfoTooltip(props) {
  return (
    <section className="popout popout__message">
      <div className={`popout__container popout__container__message ${props.isOpen ? 'popout__container_active' : ''}`} onClick={props.onClose}>
        <button className="popout__close-button" onClick={props.onClose} />
        <figure>
          <img className="popout__icon" src={props.valid ? success : fail} alt={props.valid ? 'success' : 'fail'} />
          {props.valid ? <p className="popout__text">Success! You have now been registered.</p> : <p className="popout__text">Oops, something went wrong! Please try again.</p>}
        </figure>
      </div>
    </section>
  );
}
export default InfoTooltip;
