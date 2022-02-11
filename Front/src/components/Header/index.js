import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import "./style.scss";
import { setModale, setUpdateField, connectUser, logout } from "../../actions/user";
import imageTop from "../../assets/titleLogo.png";
import logo from '../../assets/logo.png';
import Register from "./register";
import ModalImgLog from "/src/assets/ImgModal/Modal-Log.png";





export default function Header(props) {
  const { modal, mail, password, logged } = useSelector((state) => state.user);
  // Je sélectionne log,mail,password qui se trouve dans mon reducer user
  const dispatch = useDispatch();
  // Je crée ma méthode useDispatch
  
  const displayModale = (e) => {
    // Je dispatch mon new state
    dispatch(setModale(e.target.name));
  };

  const shutModal = (e) => {
    dispatch(setModale(''));
  };

  const updateField = (e) => {
    dispatch(setUpdateField(e.target.name, e.target.value));
  };

  const getConnected = (e) => {
    e.preventDefault();
    dispatch(connectUser());
  };
  
  const logOutUser = () => {
    dispatch(logout());
  };
  return (
    <div className="connect">
      <NavLink
        key="/"
        to="/"
      >
        <img className="logo-rpg" src={logo} alt="Logo" />
      </NavLink>
      {/* <img className="title-logo" src={imageTop} /> */}
      {modal == "" && (
        <button onClick={logged ? logOutUser : displayModale } name="connexion" className="btn-log">
          {`${logged ? 'Se déconnecter' : 'Se connecter'}`}
        </button>
      )}
      {modal == "connexion" && (
        <div className="form-log">
          <div className="close-modal" onClick={shutModal}>X</div>
          <img className="img-log" src={ModalImgLog} alt="image-de-fond" />
          <form className="connect-form" onSubmit={getConnected} encType="multipart/form-data">
            <div className="field-wrapper mail">
              <input
                name="email"
                value={mail}
                onChange={updateField}
                type="text"
                id="title"
                placeholder="Email"
                className=""
              />
            </div>
            
            <div className="field-wrapper pwd">
              <input
                name="password"
                value={password}
                onChange={updateField}
                type="password"
                id="title"
                placeholder="Mot de passe"
                className=""
              />
            </div>
            <div className="button-wrapper">
              <button type="submit" className="btn-send">
                Se connecter
              </button>
              <button
                onClick={displayModale}
                name="inscription"
                className="btn-send"
              >Inscription
              </button>
            </div>
              
            
          </form>
        </div>
      )}
      
      {modal == "inscription" &&<Register />}
      
    </div>
  );
}
