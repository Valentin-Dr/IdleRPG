import { v4 as uuidv4 } from 'uuid';
import './style.scss';
// == Composant
const Equipment = (object) => {
  console.log(object);
  return (
    <div className="equip-block" key={uuidv4()}>
    {object.item_id !== null && (
      <>
      <div className="name-equip">{object.item_name}</div>
      <div className={`img-equip ${object.item_name.replace(/['"]+/g, "").replace(/\s/g, "")}`}> </div>
      <div className="stat-equip">{object.attributes[0].value} {object.attributes[0].name}</div>
      </>
    )}
    </div>
  );
};

// == Export
export default Equipment;
