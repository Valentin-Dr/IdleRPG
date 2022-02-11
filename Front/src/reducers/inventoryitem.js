import {EQUIP_ITEM} from "../actions/inventoryitem"

const initialState = {
  equipeitem: ["Casque", "Arme", "Armure", "Bottes"],
};

const inventoryItem = (state = initialState, action) => {
  switch (action.type) {
    case EQUIP_ITEM:
      return {
        ...state,
        equipeitem:state.equipeitem,
      };
      default:
      return state;
    }
  }

  export default inventoryItem;
