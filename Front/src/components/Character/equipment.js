import './style.scss';

// == Composant
const Equipment = (object) => {
  
  return (
    <div className="equip-block" key={object.name}>
      <div className="name-equip">{object.name}</div>
      <div className={`img-equip ${object.img_path}`}> </div>
      <div className="stat-equip">{object.statistique}P</div>
    </div>
  );
};

// == Export
export default Equipment;
