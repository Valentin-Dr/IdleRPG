import { useSelector, useDispatch } from "react-redux";
import { setDetails, posterEquipment } from "../../actions/character";
import activeThumb from "../../utils/activeBox";

import './style.scss';

// == Composant
const Objects = (object) => {

  const dispatch = useDispatch();
  const  {selected, equipments}  = useSelector(state => state.character);

  //poster details of equipment and highlight equipment thumb
  const posterEquipMenu = (e) => {
    dispatch(posterEquipment(object.name));
    activeThumb(e.currentTarget.parentElement.parentElement);
  }

  let equipObject;
  object.reserve == undefined ? equipObject = false : equipObject = true;

  //poster details of object
  const updateDetails = (e) => {
    console.log(equipments);
    dispatch(setDetails(object));
  }
  // console.log(object);
  return (
    <div className={selected == object.name ? "object on" : "object"}>
      <div className="inner">
        { equipObject ?
        <div className={`view-wrapper ${object.name.replace(/['"]+/g, "").replace(/\s/g, "")}`} onClick={posterEquipMenu}></div> :
        <div className={`view-wrapper ${object.name.replace(/['"]+/g, "").replace(/\s/g, "")}`} onClick={updateDetails}></div>}
        { object.quantity > 0 && <div className="nbr">{object.quantity}</div>}
        { object.type_id > 2 && object.type_id < 7 &&
        <div className="stat">{object.attributes[0].value}P</div>}
      </div>
    </div>
  );
};

// == Export
export default Objects;
