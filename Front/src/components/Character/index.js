// == Import : npm
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import characterData from "../../../data/character";
import { posterCategory, posterEquipment } from "../../actions/character";
import Objects from "../Object";
import Details from "./details";
import Equipment from "./equipment";
import Stats from "./Stats";
import activeThumb from "../../utils/activeBox";
// == Import : local
import "./style.scss";

// == Composant
const Inventory = () => {
  const dispatch = useDispatch();
  const { inventory, posterCat, posterEquip, detailsObj, selected, equipments } = useSelector(
    (state) => state.character
  );

  //création objets JSX pour afficher les catégories dans l'inventaire
  let jsxRessource = inventory.ressource.filter((object) => object.quantity > 0);
  let jsxVivre = inventory.consommable.filter((object) => object.quantity > 0);

  jsxRessource = jsxRessource.map((object) => <Objects key={object.name} {...object} type="ressources" />);
  jsxVivre = jsxVivre.map((object) => <Objects key={object.name} {...object} type="consommable" />);
  const jsxEquipement = inventory.equipment.map((object) => {
    object.quantity = 0;
    object.reserve.forEach(equip => {object.quantity += equip.quantity});
    return(<Objects key={object.name} {...object}/>);
  });

  //création object JSX pour afficher les catégories d'équipement dans l'inventaire
  let jsxHelmet = [],
    jsxArmor = [],
    jsxWeapon = [],
    jsxShoes = [];
  inventory.equipment.forEach((equip) => {
    if (equip.name == "casque") {
      jsxHelmet = equip.reserve.filter(item => item.quantity > 0);
      jsxHelmet = jsxHelmet.map((item) => (
        <Objects key={item.id} {...item} type={equip.name}/>
      ));
    } else if (equip.name == "armure") {
      jsxArmor = equip.reserve.filter(item => item.quantity > 0);
      jsxArmor = jsxArmor.map((item) => (
        <Objects key={item.id} {...item} type={equip.name}/>
      ));
    } else if (equip.name == "arme") {
      jsxWeapon = equip.reserve.filter(item => item.quantity > 0);
      jsxWeapon = jsxWeapon.map((item) => (
        <Objects key={item.id} {...item} type={equip.name} />
      ));
    } else if (equip.name == "bottes") {
      jsxShoes = equip.reserve.filter(item => item.quantity > 0);
      jsxShoes = jsxShoes.map((item) => (
        <Objects key={item.id} {...item} type={equip.name} />
      ));
    }
  });
  //trier arme par type
  jsxWeapon.sort((a, b) => a.type - b.type);
  //menu affichage des catégories dans le panneau d'inventaire
  const posterCatMenu = (e) => {
    dispatch(posterCategory(e.currentTarget.getAttribute("name")));
    if (e.currentTarget.getAttribute("name") != 'equipement') dispatch(posterEquipment(''));
    activeThumb(e.currentTarget);
  };
  //création object JSX pour afficher des équipements portés
  const JSXaccessories = Object.keys(equipments).map(function(key) {
    let equipType = inventory.equipment.find(item => item.name == key);
    let equipObj = equipType.reserve.find(item => item.item_id == equipments[key]);
    if (equipObj !== undefined) {
      return (
        <Equipment key={equipObj.name} {...equipObj} />
      )
    }
  });

  return (
    <><div className="title-page">
      <div className="title">PROFIL</div>
    </div>
    <div className="character">
      <div className="panel inventory-panel">
        <div className="inner-panel">
          <div className="inventory-wrapper">
            <div className="category-title">{posterCat}</div>
            <div className="inventory-category">
              <ul className="menu-inventory">
                <li className="cat-name vivres" onClick={posterCatMenu} name="consommable">
                  <div className="inner"></div>
                  {/* <span>
                    <span>Vivre</span>
                  </span> */}
                </li>
                <li className="cat-name ressources" onClick={posterCatMenu} name="ressources">
                <div className="inner"></div>
                  {/* <span>
                    <span>Ressources</span>
                  </span> */}
                </li>
                <li className="cat-name equipement" onClick={posterCatMenu} name="equipement">
                <div className="inner"></div>
                  {/* <span>
                    <span>Equipement</span>
                  </span> */}
                </li>
              </ul>
              {posterCat == "consommable" && (
                <div className="category-block vivre">{jsxVivre}</div>
              )}
              {posterCat == "ressources" && (
                <div className="category-block ressources">{jsxRessource}</div>
              )}
              {posterCat == "equipement" && (
                <>
                  <div className="category-block equipement">{jsxEquipement}</div>
                  {posterEquip == "arme" && (
                    <div className="category-block arme">{jsxWeapon}</div>
                  )}
                  {posterEquip == "armure" && (
                    <div className="category-block armure">{jsxArmor}</div>
                  )}
                  {posterEquip == "casque" && (
                    <div className="category-block casque">{jsxHelmet}</div>
                  )}
                  {posterEquip == "bottes" && (
                    <div className="category-block shoes">{jsxShoes}</div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="details-wrapper">
            {selected.length > 0 && <Details object={detailsObj}/>}
          </div>
        </div>
      </div>
      <div className="panel stat-panel">
        <div className="inner-panel">
          <Stats /> 
        </div>
      </div>
      <div className="panel equipement-panel">
        <div className="inner-panel">
          {JSXaccessories}
        </div>
      </div>
    </div></>
  );
  
};
// == Export
export default Inventory;
