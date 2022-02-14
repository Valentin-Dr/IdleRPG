// == Import : npm
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import characterData from "../../../data/character";
import { changeShownItems, posterCategory, posterEquipment } from "../../actions/character";
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
  const { inventory, posterCat, posterEquip, detailsObj, selected, equipments, currentlyShown } = useSelector(
    (state) => state.character
  );

  //création objets JSX pour afficher les catégories dans l'inventaire
  // let jsxRessource = inventory.filter((object) => object.quantity > 0 && object.type_id === 2);
  // let jsxVivre = inventory.filter((object) => object.quantity > 0 && object.type_id === 1);
  // let jsxEquips = inventory.filter((object) => object.type_id === 3 || object.type_id === 4 || object.type_id === 5 || object.type_id === 6);
  // jsxRessource = jsxRessource.map((object) => <Objects key={object.name} {...object} type="ressources" />);
  // console.log(jsxRessource);
  // jsxVivre = jsxVivre.map((object) => <Objects key={object.name} {...object} type="consommable" />);
  // const jsxEquipement = jsxEquips.map((object) => {
  //   if (object.quantity > 0) {
  //     return(<Objects key={object.item_name} {...object}/>);
  //   }
  // });

  // //création object JSX pour afficher les catégories d'équipement dans l'inventaire
  // let jsxHelmet = inventory.filter((item) => item.type_id === 4).map((i) => (
  //   <Objects key={i.id} {...i} type={i.name}/>
  // )),
  //   jsxArmor = inventory.filter((item) => item.type_id === 5).map((i) => (
  //     <Objects key={i.id} {...i} type={i.name}/>
  //   )),
  //   jsxWeapon = inventory.filter((item) => item.type_id === 3).map((i) => (
  //     <Objects key={i.id} {...i} type={i.name}/>
  //   )),
  //   jsxShoes = inventory.filter((item) => item.type_id === 6).map((i) => (
  //     <Objects key={i.id} {...i} type={i.name}/>
  //   ));

  //trier arme par type
  // jsxWeapon.sort((a, b) => a.type - b.type);
  //menu affichage des catégories dans le panneau d'inventaire
  const refreshShownItems = (e) => {
    const id = e.currentTarget.id;
    if (id !== "consommable" && id !== "ressource") {
      const newItems = inventory.filter((item) => item.type_name !== "consommable" && item.type_name !== "ressource");
      dispatch(changeShownItems(newItems));
    } else {
      const newItems = inventory.filter((item) => item.type_name === id);
      dispatch(changeShownItems(newItems));
    }
    // console.log(posterCat);
    // dispatch(posterCategory(e.currentTarget.getAttribute("name")));
    // if (e.currentTarget.getAttribute("name") != 'equipement') dispatch(posterEquipment(''));
    activeThumb(e.currentTarget);
  };
  //création object JSX pour afficher des équipements portés
  // const JSXaccessories = equipments.map((item) => {
  //   return (
  //     <Equipment key={item.name} {...item} />
  //   )
  // });
  const fillItems = currentlyShown.map((item) => item.quantity > 0 &&
  <Objects key={uuidv4()} {...item} type={item.name}/>
  );
  const fillEquips = equipments.map((item) => 
  <Equipment key={uuidv4()} {...item} />
  );
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
                <li className="cat-name vivres" >
                  <div className="inner" id="consommable" onClick={refreshShownItems} name="consommable"></div>
                  {/* <span>
                    <span>Vivre</span>
                  </span> */}
                </li>
                <li className="cat-name ressources" >
                <div className="inner" id="ressource" onClick={refreshShownItems} name="ressource"></div>
                  {/* <span>
                    <span>Ressources</span>
                  </span> */}
                </li>
                <li className="cat-name equipement" >
                <div className="inner" id="equipement" onClick={refreshShownItems} name="equipement"></div>
                  {/* <span>
                    <span>Equipement</span>
                  </span> */}
                </li>
              </ul>
                <div className="category-block vivre">{currentlyShown && equipments && fillItems}</div>
              {/* {posterCat == "equipement" && (
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
              )} */}
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
          {equipments && fillEquips}
        </div>
      </div>
    </div></>
  );
  
};
// == Export
export default Inventory;
