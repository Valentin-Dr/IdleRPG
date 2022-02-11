import { useSelector, useDispatch } from "react-redux";
import { closeDetails, updateEquip, updateVivre } from "../../actions/character";

import './style.scss';

// == Composant
const Details = ({object}) => {
  
  const { vie, equipments } = useSelector((state) => state.character);
  const dispatch = useDispatch();

  //shut details window
  const shutDetails = () => {
    dispatch(closeDetails());
  }
  //update equipment and stats after puting on some equipment
  const changeEquip = () => {
    dispatch(updateEquip(object.item_id, object.type));
  }
  //update inventory an life after consumming concommable object
  const consommer = () => {
    dispatch(updateVivre(object.name, object.statistique, object.item_id));
  }

  return (
      <div className="details">
        <div className="close-details" onClick={shutDetails}>X</div>
        <p className="details-name">{object.name}</p>
        <div className={`details-view ${object.img_path}`}></div>
        <div className="detail-description">
          {object.description}
        </div>
        <div className="quantity">Quantité : {object.quantity}</div>
        { object.type != 'ressources' && <><div className="statistique">Stats : {object.statistique}</div></>}
        { object.type == 'consommable' && vie < 100 && <><button className="cta" onClick={consommer}>Consommer</button></>}
        { object.type != 'consommable' && object.type != 'ressources' && equipments[object.type] != object.item_id &&
        <><button className="cta" onClick={changeEquip}>Enfiler</button></>}
      </div>
  );
};

// == Export
export default Details;
