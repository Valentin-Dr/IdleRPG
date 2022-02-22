import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import {
  accueilLogo,
  boutiqueLogo,
  combatLogo,
  craftLogo,
  fishingLogo,
  inventoryLogo,
  miningLogo
} from 'src/assets/idleMenuIcons';
import { posterMenu } from "../../actions/user";
import logo from '../../assets/logo.png';
import './style.scss';

export default function Menu() {
  const dispatch = useDispatch();
  const mobMenu  = useSelector((state) => state.user.mobMenu);

  const seeMenu = (e) => {
    dispatch(posterMenu());
    let btnMob = e.currentTarget;
    btnMob.classList.contains('on') ? btnMob.classList.remove('on') : btnMob.classList.add('on');
  }

  return (
    <><button className={mobMenu ? "mobile-menu on" : "mobile-menu"} onClick={seeMenu}>
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div className="navBarContainer">
      <NavLink
        key="/"
        to="/"
      >
        <img className="logo-rpg" src={logo} alt="Logo" />
      </NavLink>
      <NavLink
        key="logo"
        to="/"
      >
        <img className="navHidden" src={accueilLogo}/>
        <button className="accueil" onClick={seeMenu}>Accueil</button>
      </NavLink>
      <NavLink
        key="/shop"
        to="/shop"
      >
        <img className="navHidden" src={boutiqueLogo}></img>
        <button className="boutique" onClick={seeMenu}>Boutique</button>
      </NavLink>
      <NavLink
        key="/inventory"
        to="/inventory"
      >
        <img className="navHidden" src={inventoryLogo}></img>
        <button className="inventory" onClick={seeMenu}>Profil</button>
      </NavLink>
      <NavLink
        key="/fighting"
        to="/fighting"
      >
        <img className="navHidden" src={combatLogo}></img>
        <button className="combat" onClick={seeMenu}>Combat</button>
      </NavLink>
      <NavLink
        key="/craft"
        to="/craft"
      >
        <img className="navHidden" src={craftLogo}></img>
        <button className="craft" onClick={seeMenu}>Craft</button>
      </NavLink>
      <NavLink
        key="/jobs/mining"
        to="/jobs/mining"
      >
        <img className="navHidden" src={miningLogo}></img>
        <button className="minerai" onClick={seeMenu}>Minage</button>
      </NavLink>
      <NavLink
        key="/jobs/fishing"
        to="/jobs/fishing"
      >
        <img className="navHidden" src={fishingLogo}></img>
        <button className="fishing" onClick={seeMenu}>Pêche</button>
      </NavLink>
      <NavLink
        key="/rebirth"
        to="/rebirth"
      >
        {/* <img className="navHidden" src={fishingLogo}></img> */}
        <button className="fishing" onClick={seeMenu}>Rebirth</button>
      </NavLink>
      {/* <iframe width="100%" height="450" scrolling="no" allow="autoplay"
      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1233926452&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true">
      </iframe> */}
      {/* <iframe width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay"
      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1233926452&color=%2300aaff&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false">
      </iframe>
      <div className="SC1"><a href="https://soundcloud.com/xdeviruchi" title="xDeviruchi" target="_blank" className="SC2">xDeviruchi</a> · <a href="https://soundcloud.com/xdeviruchi/sets/8-bit-fantasy-adventure" title="8-Bit Fantasy &amp; Adventure" target="_blank" className="SC3">
      8-Bit Fantasy &amp; Adventure</a></div> */}
    </div></>
  );
}
