import { SEND_RESOURCE_TO_INVENTORY } from "../actions/mining";
import { POSTER_CATEGORY, POSTER_EQUIP, SET_DETAILS,
  CLOSE_DETAILS, UPDATE_EQUIPMENT,UPDATE_VIVRE, SPARE_POINTS, UPDATE_NBR_FIELD,
  SET_CHARACTER_DATA, BUY_ITEM, EQUIP_ITEM_BACK_TO_INV, CHANGE_SHOWN_ITEMS_INV, CHANGE_SHOWN_ITEMS_ID, REFRESH_SHOWN_ITEMS, REFRESH_REBIRTH_FRUITS, SET_STRENGTH_UPGRADES, MODIFY_STRENGTH } from '../actions/character';
import { ADD_CRAFTED_ITEM_TO_INVENTORY, SPEND_RESOURCES_FOR_CRAFT } from "../actions/craft";
import { SEND_BUY_ITEM_TO_DB } from "../actions/shop";
import {
  UPDATE_AFTER_FIGHT,
  UPDATE_HEALTH_BAR_PLAYER,
  RECEIVE_DAMAGE,
  UPDATE_CHARACTER_LEVEL,
  ADD_STATS_POINTS_AFTER_LVL_UP,
  UPDATE_LEVEL,
} from "../actions/fight";
import { ACTIVATE_REBIRTH } from "../actions/rebirth";
import { UNLOCK_NEW_UPGRADE } from "../actions/upgrades";

const initialState = {
  nom: "The Counter",
  exp: 50,
  exp_up: 0,
  exp_floor: 0,
  level: 1,
  inventory: [],
  equipments: [],
  currentlyShown: [],
  currentlyShownId: "",
  competences: [],
  detailsObj: {
    item_id: 1,
    name: "",
    img_path: "",
    description: "",
    statistique: 0,
    quantity: 0,
    type: "",
  },
  vie: 60,
  force: 0,
  upgradesForce: 0,
  endurance: 1,
  dextérité: 1,
  gold: 6500,
  attackSpeed: 2000,
  points: 50,
  posterCat: "",
  posterEquip: "",
  selected: "",
  pointsendurance: 0,
  pointsforce: 0,
  pointsdextérité: 0,
  rebirthAmount: 0,
  rebirthFruits: 200,
  hasRebirthed: false,
};

const character = (state = initialState, action = {}) => {
  switch (action.type) {
    // case ACTIVATE_REBIRTH:
    //   return {
    //     currentlyShown: [],
    //     currentlyShownId: "",
    //     posterCat: "",
    //     posterEquip: "",
    //     selected: "",
    //     rebirthAmount: state.rebirthAmount + 1,
    //     rebirthFruits: state.rebirthFruits + action.payload.level,
    //   }
    case CHANGE_SHOWN_ITEMS_INV:
      return {
        ...state,
        currentlyShown: [...action.payload.data],
      };
    case CHANGE_SHOWN_ITEMS_ID:
      return {
        ...state,
        currentlyShownId: action.payload.id,
      };
    case REFRESH_SHOWN_ITEMS:
        return {
          ...state,
          currentlyShown: [],
          currentlyShown: state.currentlyShownId
          && state.currentlyShownId !== "consommable" && state.currentlyShownId !== "ressource"
          ? state.inventory[0] !== null && [...state.inventory.filter((i) => i.type_name !== "consommable" && i.type_name !== "ressource")]
          : state.inventory[0] !== null && [...state.inventory.filter((item) => item.type_name === state.currentlyShownId)],
        };
        case SEND_RESOURCE_TO_INVENTORY:
          console.log(action.payload.item);
          // MAJ inventaire après ajout ressource/consommable
            const checkPresenceOfResource = state.inventory.find((item) => item.item_id === action.payload.item.id);
            if (checkPresenceOfResource) {
              return {
                ...state,
                inventory: state.inventory.map((item) => item.item_id === action.payload.item.id
                ? {...item, quantity: item.quantity + action.payload.quantity}
                : item),
              };
            } else {
            return {
              ...state,
              inventory: [
                ...state.inventory,
                {
                  ...action.payload.item,
                  item_id: action.payload.item.id,
                  quantity: action.payload.quantity,
                  type_name: action.payload.item.type,
                  attributes: [...action.payload.item.attribute],
                },
              ],
            };
          };
    case SPEND_RESOURCES_FOR_CRAFT:
      //MAJ ressources après utilisation pour forger équipement
      return {
        ...state,
        inventory: state.inventory.map((resource) =>
        resource.name === action.payload.resource.name
        ? {...resource, quantity: resource.quantity - action.payload.resource.quantity}
        : resource),
      };
    case ADD_CRAFTED_ITEM_TO_INVENTORY:
      const checkPresenceOfEquip = state.inventory.find((equip) => equip.item_id === action.payload.data.id);
      if (checkPresenceOfEquip) {
        return {
          ...state,
          inventory: state.inventory.map((equip) => equip.item_id === action.payload.data.id ? {...equip, quantity: equip.quantity + 1} : equip),
        };
      } else {
        return {
          ...state,
          inventory: [
            ...state.inventory,
            {
              attributes: action.payload.data.attribute,
              item_desc: action.payload.data.desc,
              item_id: action.payload.data.id,
              name: action.payload.data.name,
              quantity: 1,
              type_id: action.payload.data.item_type_id,
              type_name: action.payload.data.type,
            },
          ],
        };
      };
    case SET_CHARACTER_DATA:
      //Récupérer inventaire de la BDD
      //MAJ les statistiques du personnage
      let  dataForce = (action.data.attributes.find(obj => obj.name == "force")).value;
      if (action.data.equipments[3].attributes[0] != null) dataForce += action.data.equipments[3].attributes[0].value;
      let dataEndurance = (action.data.attributes.find(obj => obj.name == "endurance")).value;
      if (action.data.equipments[0].attributes[0] != null) dataEndurance += action.data.equipments[0].attributes[0].value;
      if (action.data.equipments[1].attributes[0] != null) dataEndurance += action.data.equipments[1].attributes[0].value;
      let dataDextérité = (action.data.attributes.find(obj => obj.name == "dextérité")).value;
      if (action.data.equipments[2].attributes[0] != null) dataDextérité += action.data.equipments[2].attributes[0].value;
      const dataPoints = action.data.attributes.find(obj => obj.name == "points de caractéristiques");
      const dataVie = action.data.attributes.find(obj => obj.name == "points de vie");
      console.log(action.data);
      return {
        ...state,
        inventory: action.data.inventory[0] === null
        ? []
        : [
          ...action.data.inventory,
        ],
        equipments: [
          ...action.data.equipments,
        ],
        competences: [
          ...action.data.competences,
        ],
        // force: dataForce,
        endurance: dataEndurance,
        dextérité: dataDextérité,
        vie: dataVie.value > 100 ? 100 : dataVie.value,
        points: dataPoints.value,
        exp:action.data.exp,
        exp_up:action.data.exp_up,
        exp_floor:action.data.exp_floor,
        gold:action.data.gold,
        level:action.data.level,
        rebirthFruits: action.data.rebirth_fruit,
      };
    case SET_STRENGTH_UPGRADES:
      return {
        ...state,
        force: action.payload.strength,
      };
    case MODIFY_STRENGTH:
      return {
        ...state,
        force: action.payload.strength,
      };
    case POSTER_CATEGORY:
      //Afficher les éléments de l'inventaire correspondant à l'onglet sélectionné dans le tableau d'inventaire
      return {
        ...state,
        posterCat: action.category,
        selected: "",
      };
    case POSTER_EQUIP:
      //Afficher les équipements de l'inventaire correspondant à l'onglet sélectionné dans le tableau d'inventaire
      return {
        ...state,
        posterEquip: action.posterEquip,
        selected: "",
      };
    case SET_DETAILS:
      console.log(action.detailsObj);
      //Afficher les informations de l'objet sélectionné dans le panneau de détail
      const { item_id, name, img_path, item_desc, desc, type_id, attributes } = action.detailsObj;
      let quantity;
      action.detailsObj.reserve == undefined
        ? (quantity = action.detailsObj.quantity)
        : (quantity = 0);
      return {
        ...state,
        detailsObj: {
          item_id: item_id,
          name: name,
          img_path: name.replace(/['"]+/g, "").replace(/\s/g, ""),
          description: item_desc ? item_desc : desc,
          statistique: attributes[1].name === "soins" ? attributes[1].value : attributes[0].value,
          quantity: quantity,
          type: type_id,
        },
        selected: name,
      };
    case CLOSE_DETAILS:
      //Fermer le panneau de détail
      return {
        ...state,
        selected: "",
      };
    case UPDATE_EQUIPMENT:
      const newEquipment = state.inventory.find((item) => item.item_id === action.item.item_id);
      const findEquip = state.equipments.find((equip) => equip.slot_name === newEquipment.type_name);
      return {
        ...state,
        inventory: state.inventory.map((item) => item.item_id === action.item.item_id ? {...item, quantity: item.quantity - 1 } : item),
        equipments: state.equipments.map((equip) => equip.slot_name === newEquipment.type_name
        ? {...equip,
          attributes: newEquipment.attributes,
          item_id: newEquipment.item_id,
          item_desc: newEquipment.description,
          item_name: newEquipment.name}
          : equip),
          // La stat modifiée
          [newEquipment.attributes[0].name]: findEquip.attributes[0]
          ? state[newEquipment.attributes[0].name] + newEquipment.attributes[0].value - findEquip.attributes[0].value
          : state[newEquipment.attributes[0].name],
        currentlyShown: state.currentlyShown.map((item) => item.item_id === action.item.item_id ? {...item, quantity: item.quantity - 1 } : item),
        selected: "",
      };
    case EQUIP_ITEM_BACK_TO_INV:
      const findPayloadInInventory = state.inventory.find((item) => item.item_id === action.payload.item.item_id);
      const findEquippedCurrent = state.equipments.find((item) => item.slot_name === findPayloadInInventory.type_name);
      return {
        ...state,
        inventory: state.inventory.map((item) => item.item_id === findEquippedCurrent.item_id ? {...item, quantity: item.quantity + 1} : item),
        currentlyShown: state.currentlyShown.map((item) => item.item_id === findEquippedCurrent.item_id ? {...item, quantity: item.quantity + 1} : item),
      };
    case UPDATE_VIVRE:
      return {
        ...state,
        inventory: state.inventory.map((item) => item.item_id === action.id ? {...item, quantity: item.quantity - 1} : item),
        currentlyShown: state.currentlyShown.map((item) => item.item_id === action.id ? {...item, quantity: item.quantity - 1} : item),
        vie:
          state.vie + action.statistique > 100
            ? 100
            : state.vie + action.statistique,
        selected: "",
      };
    case SPARE_POINTS:
      //MAJ les points de stats après affectations de points à une stat de performance
      let statProp = 'points' + action.name;
      return {
        ...state,
        [action.name]: state[action.name] + action.statistique,
        points: state.points - action.statistique,
        [statProp]: 0,
      };
    case UPDATE_NBR_FIELD:
      //MAJ champ contrôlé d'affectation de points aux stats
      let newValStat = action.value;
      if (action.value > action.max) {
        newValStat = action.max;
      } else if (action.value < action.min) {
        newValStat = action.min;
      }
      return {
        ...state,
        [action.name]: newValStat,
      };
    case UPDATE_HEALTH_BAR_PLAYER:
      //remettre vie au max
      return {
        ...state,
        vie: action.payload.newHealth,
      };
    case RECEIVE_DAMAGE:
      //reporter perte de vie pendant combat
      return {
        ...state,
        vie: action.payload.newHealth,
      };
    case BUY_ITEM:
      //MAJ argent après dépense au magasin
      return {
        ...state,
        gold: state.gold - action.payload.gold,
      };
    case SEND_BUY_ITEM_TO_DB:
      const checkPresenceOfBought = state.inventory.find((item) => item.item_id === action.product.id);
      if (checkPresenceOfBought) {
        return {
          ...state,
          inventory: state.inventory.map((equip) => equip.item_id === action.product.id ? {...equip, quantity: equip.quantity + action.quantity} : equip),
        };
      } else {
        return {
          ...state,
          inventory: [
            ...state.inventory,
            {
              attributes: action.product.attribute,
              item_desc: action.product.desc,
              item_id: action.product.id,
              name: action.product.name,
              quantity: action.quantity,
              type_id: action.product.item_type_id,
              type_name: action.product.type,
            },
          ],
        };
      };
    case UPDATE_CHARACTER_LEVEL:
      return {
        ...state,
        exp_floor: action.payload.data.exp_floor,
        exp_up: action.payload.data.exp_up,
        level: action.payload.data.level,
      };
    // TODO FIX FIGHTMIDDLEWARE
    case ADD_STATS_POINTS_AFTER_LVL_UP:
      //ajout de points après changement de niveau
      return {
        ...state,
        points: state.points + 5,
      };
    case UPDATE_AFTER_FIGHT:
      const checkPresenceOfDrop = state.inventory.find((i) => i.item_id === action.cmr.item_id);
      if (checkPresenceOfDrop && action.hasLoot) {
        return {
          ...state,
          vie: action.newHp,
          gold: state.gold + action.goldValue,
          exp: state.exp + action.expValue,
          inventory: state.inventory.map((item) => item.item_id === action.cmr.item_id ? {...item, quantity: item.quantity + action.cmr.quantity} : item)
        };
      } else if (!checkPresenceOfDrop && action.hasLoot) {
        return {
          ...state,
          vie: action.newHp,
          gold: state.gold + action.goldValue,
          exp: state.exp + action.expValue,
          inventory: [
            ...state.inventory,
            {
              attributes: action.cmr.attributes,
              item_desc: action.cmr.item_desc,
              item_id: action.cmr.item_id,
              name: action.cmr.name,
              quantity: action.cmr.quantity,
              type_id: action.cmr.item_type_id,
              type_name: action.cmr.item_type_name,
            },
          ],
        };
      };
      case REFRESH_REBIRTH_FRUITS:
      return {
        ...state,
        rebirthFruits: state.rebirthFruits - action.payload.fruits,
      };
      case UNLOCK_NEW_UPGRADE:
        return {
          ...state,
          competences: action.payload.competences,
        };
      default:
      return state;
  }
};

export default character;
