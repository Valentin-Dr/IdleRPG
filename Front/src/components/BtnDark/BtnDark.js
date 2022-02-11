
import { useDispatch } from "react-redux";
import { setDarkMode } from "../../actions/user";
import './Btndark.scss'
// J'importe useEffect pour ne pas avoir de rendu a chaque chargement
// J'importe useState pour avoir mon state 

export default function BtnDark() {

  const dispatch = useDispatch();
  const toogleDark = () => dispatch(setDarkMode());
  return (
   
    <div className="toggle-theme-wrapper">
      <span className="sun">☀️</span>
      <label className="toggle-theme" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onChange={toogleDark}
          
        />
        <div className="slider-dark round"></div>
      </label>
      <span className="moon">🌒</span>
    </div>
  );
};
 

