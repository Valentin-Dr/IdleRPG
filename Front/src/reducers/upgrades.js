import { SET_ALL_UPGRADES, UPDATE_CURRENT_UPGRADE } from "../actions/upgrades";

const initialState = {
  upgradesList: [
    {
      id: 0,
      name: "Chargement...",
      desc: "Chargement...",
      level: "Chargement...",
      effect: "Chargement...",
      effectType: "Chargement...",
      effectStat: "Chargement...",
      cost: "Chargement...",
      incrementCost: "Chargement...",
    },
  ],
};

const upgrades = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ALL_UPGRADES: 
    return {
      ...state,
      upgradesList: action.payload.data,
    };
    // case UPDATE_CURRENT_UPGRADE:
    //   return {
    //     ...state,
    //     upgradesList: state.upgradesList.map((upg) => upg.id === action.payload.id
    //     ? {...upg, level_competence: upg.level_competence + 1} : upg)
    //   }
  default:
    return state;
  }
};

export default upgrades;
