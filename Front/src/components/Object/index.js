import { useSelector, useDispatch } from "react-redux";
import { setDetails, posterEquipment } from "../../actions/character";
import activeThumb from "../../utils/activeBox";

import './style.scss';

// == Composant
const Objects = (object) => {

  const dispatch = useDispatch();
  const  selected  = useSelector(state => state.character.selected);

  //poster details of equipment and highlight equipment thumb
  const posterEquipMenu = (e) => {
    dispatch(posterEquipment(object.name));
    activeThumb(e.currentTarget.parentElement.parentElement);
  }

  let equipObject;
  object.reserve == undefined ? equipObject = false : equipObject = true;

  //poster details of object
  const updateDetails = (e) => {
    dispatch(setDetails(object));
  }

  return (
    <div className={selected == object.name ? "object on" : "object"}>
      <div className="inner">
        { equipObject ?
        <div className={`view-wrapper ${object.img_path}`} onClick={posterEquipMenu}></div> :
        <div className={`view-wrapper ${object.img_path}`} onClick={updateDetails}></div>}
        { object.quantity > 0 && <div className="nbr">{object.quantity}</div>}
        { object.statistique &&
        <div className="stat">{object.statistique}P</div>}
      </div>
    </div>
  );
};

// == Export
export default Objects;
