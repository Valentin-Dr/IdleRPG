import { SEND_RESOURCE_TO_INVENTORY } from "../actions/mining";
import { POSTER_CATEGORY, POSTER_EQUIP, SET_DETAILS,
  CLOSE_DETAILS, UPDATE_EQUIPMENT,UPDATE_VIVRE, SPARE_POINTS, UPDATE_NBR_FIELD,
  SET_CHARACTER_DATA, BUY_ITEM } from '../actions/character';
import { SPEND_RESOURCES_FOR_CRAFT } from "../actions/craft";
import { SEND_BUY_ITEM_TO_DB } from "../actions/shop";
import {
  UPDATE_AFTER_FIGHT,
  UPDATE_HEALTH_BAR_PLAYER,
  RECEIVE_DAMAGE,
  UPDATE_CHARACTER_LEVEL,
  ADD_STATS_POINTS_AFTER_LVL_UP,
  UPDATE_LEVEL,
} from "../actions/fight";

const initialState = {
  nom: "The Counter",
  exp: 50,
  exp_up: 0,
  exp_floor: 0,
  level: 1,
  inventory: {
    consommable: [
      {
        item_id: 1,
        name: "",
        description: "",
        img_path: "",
        quantity: 0,
        statistique: 0,
      },
    ],
    equipment: [
      {
        name: "arme",
        description: "",
        img_path: "épéedefer",
        quantity: 0,
        type_statistique: "force",
        reserve: [],
      },
      {
        name: "casque",
        description: "",
        img_path: "casquedefer",
        quantity: 0,
        type_statistique: "endurance",
        reserve: [],
      },
      {
        name: "armure",
        description: "",
        img_path: "armuredefer",
        quantity: 0,
        type_statistique: "endurance",
        reserve: [],
      },
      {
        name: "bottes",
        description: "",
        img_path: "bottesdefer",
        quantity: 0,
        type_statistique: "dextérité",
        reserve: [],
      },
    ],
    ressource: [
      {
        item_id: 1,
        name: "",
        description: "",
        img_path: "",
        quantity: 0,
      },
    ],
  },
  equipments: {},
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
  force: 150,
  endurance: 75,
  dextérité: 35,
  gold: 6500,
  attackSpeed: 2000,
  points: 50,
  posterCat: "",
  posterEquip: "",
  selected: "",
  pointsendurance: 0,
  pointsforce: 0,
  pointsdextérité: 0,
};

const character = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEND_RESOURCE_TO_INVENTORY:
      //MAJ inventaire après ajout ressource/consommable
      let addInventory = state.inventory[action.obj_type];
      let addObject = addInventory.find((obj) => obj.item_id == action.item_id);
      if (addObject == undefined) {
        //si objet existe pas dans l'inventaire, y ajouter nouvel objet
        addObject = {
          item_id: action.item_id,
          name: action.name,
          description: action.desc,
          img_path: action.name.replace(/['"]+/g, "").replace(/\s/g, ""),
          quantity: action.quantity,
        };
        if (action.obj_type == "consommable")
          addObject.statistique = action.stat;
        addInventory.push(addObject);
      } else {
        //si objet existe dans l'inventaire, augmenter sa quantité
        for (let i = 0; i < addInventory.length; i++) {
          if (addInventory[i].item_id == addObject.item_id) {
            addInventory[i].quantity += action.quantity;
          }
        }
      }
      return {
        ...state,
        inventory: {
          ...state.inventory,
          [action.obj_type]: addInventory,
        },
      };
    case SPEND_RESOURCES_FOR_CRAFT:
      //MAJ ressources après utilisation pour forger équipement
      let spendRessources = state.inventory.ressource;
      action.recipe.ingredients.forEach((substance) => {
        for (let i = 0; i < spendRessources.length; i++) {
          if (substance.component_id == spendRessources[i].item_id) {
            spendRessources[i].quantity -= substance.quantity;
          }
        }
      });
      //ajouter équipement forgé à l'inventaire
      let craftedEquipments = state.inventory.equipment;
      craftedEquipments.forEach((elem) => {
        if (elem.name == action.recipe.type) {
          elem.quantity += 1;
          if (elem.reserve.find(weapon => weapon.item_id == action.recipe.id) == undefined) {
            //si equipement existe pas dans l'inventaire, y ajouter nouvel objet équipement
            let stat = 0;
            if (elem.name == "arme") {
              stat = action.recipe.attribute.find(att => att.name == 'force');
            } else if (elem.name == "armure") {
              stat = action.recipe.attribute.find(att => att.name == 'endurance');
            } else if (elem.name == "casque") {
              stat = action.recipe.attribute.find(att => att.name == 'endurance');
            } else if (elem.name == "bottes") {
              stat = action.recipe.attribute.find(att => att.name == 'dextérité');
            }
            let crafted = {
              item_id: action.recipe.id, 
              name: action.recipe.name, 
              description: action.recipe.desc, 
              quantity: 1,
              img_path: action.recipe.name.replace(/['"]+/g, "").replace(/\s/g, ""),
              statistique: stat.value,
            }
            elem.reserve.push(crafted);
          } else {
            //si l'équipemen existe dans l'inventaire, augmenter sa quantité
            for (let i = 0; i < elem.reserve.length; i++) {
              if (elem.reserve[i].item_id == action.recipe.id) {
                elem.reserve[i].quantity += 1;
                break;
              }
            }
          }
        }
      });
      return {
        ...state,
        inventory: {
          ...state.inventory,
          ressource: spendRessources,
          equipment: craftedEquipments,
        },
      };
    case SET_CHARACTER_DATA:
      // console.log('action',action);
      //Récupérer inventaire de la BDD
      const feelObj = (id, name, img, desc, quantity) => {
        return {
          item_id: id,
          name: name,
          img_path: img,
          description: desc,
          quantity: quantity,
        };
      };
      let newConsommable = [],
        newRessource = [],
        newArme = [],
        newCasque = [],
        newArmure = [],
        newBottes = [];
      if (action.data.inventory[0] !== null) {
        action.data.inventory.forEach((object) => {
          if (object.type_name == "ressource") {
            let currentRessource = feelObj(
              object.item_id,
              object.name,
              object.name.replace(/['"]+/g, "").replace(/\s/g, ""),
              object.item_desc,
              object.quantity
            );
            newRessource.push(currentRessource);
          } else if (object.type_name == "consommable") {
            let stat = object.attributes.find((item) => item.name == "soins");
            let currentConso = feelObj(
              object.item_id,
              object.name,
              object.name.replace(/['"]+/g, "").replace(/\s/g, ""),
              object.item_desc,
              object.quantity
            );
            currentConso.statistique = stat.value;
            newConsommable.push(currentConso);
          } else if (object.type_name == "arme") {
            let stat = object.attributes.find((item) => item.name == "force");
            let currentArme = feelObj(
              object.item_id,
              object.name,
              object.name.replace(/['"]+/g, "").replace(/\s/g, ""),
              object.item_desc,
              object.quantity
            );
            currentArme.statistique = stat.value;
            newArme.push(currentArme);
          } else if (object.type_name == "casque") {
            let stat = object.attributes.find(
              (item) => item.name == "endurance"
            );
            let currentCasque = feelObj(
              object.item_id,
              object.name,
              object.name.replace(/['"]+/g, "").replace(/\s/g, ""),
              object.item_desc,
              object.quantity
            );
            currentCasque.statistique = stat.value;
            newCasque.push(currentCasque);
          } else if (object.type_name == "bottes") {
            let stat = object.attributes.find(
              (item) => item.name == "dextérité"
            );
            let currentBottes = feelObj(
              object.item_id,
              object.name,
              object.name.replace(/['"]+/g, "").replace(/\s/g, ""),
              object.item_desc,
              object.quantity
            );
            currentBottes.statistique = stat.value;
            newBottes.push(currentBottes);
          } else if (object.type_name == "armure") {
            let stat = object.attributes.find(
              (item) => item.name == "endurance"
            );
            let currentArmure = feelObj(
              object.item_id,
              object.name,
              object.name.replace(/['"]+/g, "").replace(/\s/g, ""),
              object.item_desc,
              object.quantity
            );
            currentArmure.statistique = stat.value;
            newArmure.push(currentArmure);
          }
        });
      }
      //Répartir les équipements dans les catégories d'équipement de l'inventaire
      let newEquip = state.inventory.equipment.map(equip => {
        if (equip.name == 'arme') {
            equip.reserve = [...equip.reserve, ...newArme];
        } else if (equip.name == 'casque') {
            equip.reserve = [...equip.reserve, ...newCasque];
        } else if (equip.name == 'armure')  {
            equip.reserve = [...equip.reserve, ...newArmure];
        } else if (equip.name == 'bottes')  {
            equip.reserve = [...equip.reserve, ...newBottes];
        }
        equip.quantity = equip.reserve.length;
        return equip;
      });
      let inventoryData = {
        ressource: newRessource,
        consommable: newConsommable,
        equipment: newEquip,
      };

      //MAJ les équipements portés dans les équipements du state
      let equipmentData = {};
      action.data.equipments.forEach((object) => {
        equipmentData[object.slot_name] = object.item_id;
      });
      //MAJ les statisqtiques du personnage
      let  dataForce = (action.data.attributes.find(obj => obj.name == "force")).value;
      if (action.data.equipments[3].attributes[0] != null) dataForce += action.data.equipments[3].attributes[0].value;
      let dataEndurance = (action.data.attributes.find(obj => obj.name == "endurance")).value;
      if (action.data.equipments[0].attributes[0] != null) dataEndurance += action.data.equipments[0].attributes[0].value;
      if (action.data.equipments[1].attributes[0] != null) dataEndurance += action.data.equipments[1].attributes[0].value;
      let dataDextérité = (action.data.attributes.find(obj => obj.name == "dextérité")).value;
      if (action.data.equipments[2].attributes[0] != null) dataDextérité += action.data.equipments[2].attributes[0].value;
      const dataPoints = action.data.attributes.find(obj => obj.name == "points de caractéristiques");
      const dataVie = action.data.attributes.find(obj => obj.name == "points de vie");
      return {
        ...state,
        inventory: inventoryData,
        equipments: equipmentData,
        force: dataForce,
        endurance: dataEndurance,
        dextérité: dataDextérité,
        vie: dataVie.value > 100 ? 100 : dataVie.value,
        points: dataPoints.value,
        exp:action.data.exp,
        exp_up:action.data.exp_up,
        exp_floor:action.data.exp_floor,
        gold:action.data.gold,
        level:action.data.level,
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
      //Afficher les informations de l'objet sélectionné dans le panneau de détail
      const { item_id, name, img_path, description, type, statistique } = action.detailsObj;
      let quantity;
      action.detailsObj.reserve == undefined
        ? (quantity = action.detailsObj.quantity)
        : (quantity = 0);
      return {
        ...state,
        detailsObj: {
          item_id: item_id,
          name: name,
          img_path: img_path,
          description: description,
          statistique: statistique,
          quantity: quantity,
          type: type,
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
      //Changer d'équipement
      //MAJ les équipements disponibles dans l'inventaire après avoir changer d'équipement
      let equipInvent = state.inventory.equipment;
      equipInvent.forEach(equip => {
        if (equip.name == action.objType) {
          for (let i = 0; i < equip.reserve.length; i++) {
            if (equip.reserve[i].item_id == action.id) {
              equip.reserve[i].quantity -= 1;
            } else if (
              equip.reserve[i].item_id == state.equipments[action.objType]
            ) {
              equip.reserve[i].quantity += 1;
            }
          }
        }
      });
      //MAJ les stats du personnage en fonction de l'équipement porté
      let oldStuff = state.equipments[action.objType];
      let stuffType = state.inventory.equipment.find(
        (item) => item.name == action.objType
      );

      let oldVal = stuffType.reserve.find((item) => item.item_id == oldStuff);
      let newVal = stuffType.reserve.find((item) => item.item_id == action.id);

      let newEquipment = {
        ...state.equipments,
        [action.objType]: action.id,
      };
      return {
        ...state,
        inventory: {
          ...state.inventory,
          equipment: equipInvent,
        },
        equipments: newEquipment,
        [stuffType.type_statistique]:
          oldVal !== undefined
            ? state[stuffType.type_statistique] +
              (newVal.statistique - oldVal.statistique)
            : state[stuffType.type_statistique] + newVal.statistique,
        selected: "",
      };
    case UPDATE_VIVRE:
      let stockVivre = state.inventory.consommable;
      //trouver le vivre correspondant au nom dans les vivres de l'inventaire
      stockVivre = stockVivre.find((item) => item.name == action.name);
      //enlever 1 à la quantité de l'inventaire trouvé
      stockVivre.quantity -= 1;
      //mettre à jour vivres de l'inventaire avec le vivre mis à jour
      let newVivres = state.inventory.consommable.map((vivre) => {
        if (vivre.name == action.name) vivre.quantity = stockVivre.quantity;
        return vivre;
      });
      // mettre à jour l'inventaire avec les vivres mis à jour
      let newInventory = {
        ...state.inventory,
        newVivres,
      };
      return {
        ...state,
        inventory: newInventory,
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
      //MAJ inventaire après achat objet
      
      const addBoughtToInvent = (list, id, name, stat, desc) => {
        if (list.find(elem => elem.item_id == id) == undefined) {
          //si n'est pas dans l'inventaire, le crééer et l'y ajouter
          let newObj = {
            item_id: id,
            name: name,
            img_path: name.replace(/['"]+/g, "").replace(/\s/g, ""),
            description: desc,
            quantity: 1,
          };
          if (stat != undefined) newObj.statistique = stat.value;
          list.push(newObj);
        } else {
          //si est dans l'inventaire, augmenter sa quantité
          for (let i = 0; i < list.length; i++) {
            if (list[i].item_id == id) {
              list[i].quantity += 1;
              break;
            }
          }
        }
      };

      let boughtInventory = state.inventory;
      let product = action.product;
      if (product.type == "consommable") {
        let stat = product.attribute[2];
        addBoughtToInvent(
          boughtInventory.consommable,
          product.id,
          product.name,
          product.desc,
          stat
        );
      } else if (product.type == "ressource") {
        addBoughtToInvent(boughtInventory.ressource, product.id, product.name, product.desc);
      } else {
        let stat = product.attribute[2];
        let equipIndex = boughtInventory.equipment.findIndex(
          (elem) => elem.name == product.type
        );
        addBoughtToInvent(
          boughtInventory.equipment[equipIndex].reserve,
          product.id,
          product.name,
          product.desc,
          stat
        );
      }
      return {
        ...state,
        inventory: boughtInventory,
      };
    case UPDATE_CHARACTER_LEVEL:
      return {
        ...state,
        level: action.payload.newLvl,
      };
    // TODO FIX FIGHTMIDDLEWARE
    case ADD_STATS_POINTS_AFTER_LVL_UP:
      //ajout de points après changement de niveau
      return {
        ...state,
        points: state.points + 5,
      };
    case UPDATE_AFTER_FIGHT:
      //MAJ inventaire avec objets gagnés lors du combat
      const changeInventory = (inventory, cmr) => {
        if (inventory.find(obj => obj.item_id == cmr.item_id) == undefined) {
          //créer objet et l'ajouter dans l'inventaire si il n'y est pas
          let fightObj = {
            item_id: cmr.item_id,
            name: cmr.item_name,
            img_path: cmr.item_name.replace(/['"]+/g, "").replace(/\s/g, ""),
            description: cmr.item_desc,
            quantity: cmr.quantity,
          }
          if (cmr.item_type_name != 'ressource') {
            let stat = cmr.attr.find(attr => (attr.name != 'niveau' && attr.name != 'prix'))
            fightObj.statistique = stat.value;
          }
          inventory.push(fightObj);
        } else {
          //si objet dans l'inventaire, augmenter sa quantité
          for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].item_id == cmr.item_id) {
              inventory[i].quantity += cmr.quantity;
            }
          }
        }
        return inventory;
      }
      //si combat perdu il se passe rien
      if (!action.hasWin) return {
        state,
        vie: 0,
      };

      let fightInventory = state.inventory;
      if (action.hasLoot) {
        //si objet gagner lors du combat MAJ inventaire
        if (action.cmr.item_type_name == 'consommable' || action.cmr.item_type_name == 'ressource') {
          fightInventory[action.item_type_name] = changeInventory(fightInventory[action.cmr.item_type_name], action.cmr);
        }  else {
          for (let i = 0; i < fightInventory.equipment.length; i++) {
            if (fightInventory.equipment[i].name == action.cmr.item_type_name) {
              fightInventory.equipment[i] = changeInventory(fightInventory.equipment[i].reserve, action.cmr);
              break;
            }
          }
        }
      }
     
      return {
        ...state,
        vie: action.newHp,
        gold: state.gold + action.goldValue,
        exp: state.exp + action.expValue,
        inventory: fightInventory,
      };
    case UPDATE_LEVEL:
      //ajout de points après changement de niveau
      return {
        ...state,
        exp_up: action.exp_up,
        exp_floor: action.exp_floor,
        level: action.level,
      };
    default:
      return state;
  }
};

export default character;
