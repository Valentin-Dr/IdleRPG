import { COOLDOWN_CRAFT_ITEM, UPDATE_RECIPES_LIST } from "../actions/craft";

const initialState = {
  recipes: [],
  buttonTitle: 'Craft',
  canCraft: true,
};

const craft = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_RECIPES_LIST:
      return {
        ...state,
        recipes: [
          ...action.payload.recipes,
        ],
      };
    case COOLDOWN_CRAFT_ITEM:
      return {
        ...state,
        buttonTitle: state.buttonTitle === 'Veuillez patienter' ? 'Craft' : 'Veuillez patienter',
        canCraft: !state.canCraft,
      };
    default:
      return state;
  };
};

export default craft;
