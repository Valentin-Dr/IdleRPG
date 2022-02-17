// == Import : npm
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
// == Import : local
import './style.scss';
import '../../styles/allitems.scss';
import {
  spendResourcesForCraft,
  sendCraftedItem,
  getCraftableItems,
  sendCraftedItemToDb,
  setCooldownCraft,
  addCraftedItemToInv
} from '../../actions/craft';
import { useEffect } from 'react';

// == Composant
const Craft = () => {
  const dispatch = useDispatch();
  const { recipes, canCraft, buttonTitle } = useSelector((state) => state.craft);
  const { inventory } = useSelector((state) => state.character);
  useEffect(() => {
    dispatch(getCraftableItems());
  }, []);

  const craftButtonOnClick = (e) => {
    const currentRecipe = recipes.find((recipe) => recipe.id == e.target.id);
    const neededResource = inventory.find((resource) => resource.name === currentRecipe.ingredients[0].name);
    if (neededResource.quantity >= currentRecipe.ingredients[0].quantity) {
      // Limitation pour empêcher de spam la base de données
      if (canCraft) {
        dispatch(setCooldownCraft());
        dispatch(sendCraftedItemToDb(currentRecipe.id, currentRecipe.ingredients[0].component_id, currentRecipe.ingredients[0].quantity));
        dispatch(spendResourcesForCraft(currentRecipe.ingredients[0]));
        dispatch(addCraftedItemToInv(currentRecipe));
        setTimeout(() => {
          dispatch(setCooldownCraft());
        }, 2000);
      };
    } else {
      // Si le joueur n'a pas assez de ressources
      e.target.style.backgroundColor = 'red';
    }
  };
  
  const fillRecipes = recipes.map(item => 
    
    <div className={`craft-display`} key={uuidv4()}>
        <h2 className={`craft-display-title`}>
          {item.name}
        </h2>
                        {/* vvvv enlève les quotes et les espaces vvvvvv */}
        <div className={item.name.replace(/['"]+/g, "").replace(/\s/g, "")} />
        <div className="craft-display-recipe">
        {/* Liste les effets des objets ---------- vvv 2 = le prix, inutile ici*/}
        {item.attribute.map((attribute, i) => i !== 2 ? (
          <p className="craft-display-text item-effects" key={uuidv4()}>{attribute.name.replace('_', ' ')} : {attribute.value}</p>
        ) : undefined)}
        {/* Liste les ingrédients recquis pour craft */}
        { item.ingredients.map((ingredient) => (
          <p className="craft-display-text" key={uuidv4()}>{ingredient.quantity} {ingredient.name}</p>
        )) }
        <p className="smallText">{item.desc}</p>
          <button id={item.id} onClick={craftButtonOnClick}>{buttonTitle}</button>
        </div>
      </div>
  )
  return (
    <>
    <div className="title-page">
      <div className="title">CRAFT</div>
    </div>
    <div className="craft-container">
      {recipes && fillRecipes}
    </div></>
  );
};

// == Export
export default Craft;
