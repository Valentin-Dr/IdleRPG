/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import './style.scss';
import '../../styles/allitems.scss';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { boutiqueLogo } from 'src/assets/idleMenuIcons';
import {
  modaleOpen, modaleClose, emptyArray, allObject, sendBuyItemToDb,
} from '../../actions/shop';
import { buyItem } from '../../actions/character';

export default function Shop() {
  const dispatch = useDispatch();
  const {
    newShopArray,
    stuffs,
    isOpen,
  } = useSelector((state) => state.shop);
  const { gold } = useSelector((state) => state.character);
  // je veux que le chargement de la boutique ne se fasse qu'une fois,
  // au chargement initial de la page
  useEffect(() => {
    dispatch(emptyArray());
    dispatch(allObject());
  }, []);
  // console.log(stuffs.length);
  // };
  // gestion de la fermeture de la modale
  const closeModale = () => {
    dispatch(modaleClose());
  };
  // je compare si l'utilisateur a assez d'argent ou pas pour acheter un objet,
  // si c'est positif, ça retire l'argent de sa bourse, sinon ça ferme juste la modale sans action
  const buyingItem = () => {
    const currentItem = stuffs.find((stuff) => stuff.id == isOpen.id);
    if (gold >= stuffs.find((stuff) => stuff.id == isOpen.id).attribute.find((att) => att.name === 'prix').value) {
      dispatch(buyItem(stuffs.find((stuff) => stuff.id == isOpen.id).attribute.find((att) => att.name === 'prix').value));
      // console.log(stuffs.find((stuff) => stuff.id == isOpen.id));
      // console.log('currentItem', currentItem);
      dispatch(sendBuyItemToDb(currentItem, 1));
      dispatch(modaleClose());
    }
    else {
      dispatch(modaleClose());
    }
  };
  // Ici on récupère l'id de l'élément parent du boutton ajouté pour comparé cet id
  // avec l'id de l'objet actuellement présent dans le shop
  const getIdOfButtonParent = (e) => {
    const selectedId = e.target.parentElement.parentElement.id;
    dispatch(modaleOpen(selectedId));
  };
  // newShopArray && console.log(newShopArray);
  return (
    <>
      <div className="background-shop" />
      <div className="shop-container">
        <div className="shop-main">
          <p>Boutique</p>
        </div>
        <div className="money">
          {gold}&nbsp;<img className="money-image" src={boutiqueLogo} alt="or" />
        </div>
        <div className="shop-inventory">
          { newShopArray.map((stuff) => (
            <div className="stuff" id={stuff.id} key={uuidv4()}>
              <p className="stuff-name" key={uuidv4()}>{stuff.name}</p>
              <div key={uuidv4()} className={`stuff-image ${stuff.name.replace(/['"]+/g, '').replace(/\s/g, '')}`} />
              <div key={uuidv4()} className="stuff-info">
                <div key={uuidv4()} className="stuff-stat">
                  {
                    stuff.attribute.map((elem) => (elem.name !== 'prix' ? (<div key={uuidv4()}>{`${elem.name.replace('_', ' ')}: ${elem.value} `}</div>) : ''))
                  }
                </div>
                <div className="stuff-val">{stuff.attribute.find((att) => att.name === 'prix').value}</div><img className="stuff-money" src={boutiqueLogo} alt="or" />
              </div>
              <div className="btn-wrapper">
                <button onClick={getIdOfButtonParent} className="buy-button" type="button">Acheter</button>
              </div>
            </div>
          ))}
        </div>
        {isOpen.open && stuffs.find((stuff) => stuff.id == isOpen.id)
          ? (
            <div className="buying-modal">Êtes-vous sûr de vouloir acheter "{stuffs.find((stuff) => stuff.id == isOpen.id).name}" pour
              <span>
                {stuffs.find((stuff) => stuff.id == isOpen.id).attribute.find((att) => att.name === 'prix').value}&nbsp;
                <img src={boutiqueLogo} alt="or" />
              </span>
              <div className="button-container"><button className="buying-button" type="button" onClick={buyingItem}>oui</button>
                <button className="buying-button" type="button" onClick={closeModale}>non</button>
              </div>
            </div>
          ) : ''}
      </div>
    </>
  );
}
