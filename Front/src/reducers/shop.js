import {
  RANDOM_STUFF,
  MODALE_OPEN,
  MODALE_CLOSE,
  EMPTY_ARRAY,
  ALL_OBJECT,
} from '../actions/shop';

const initialState = {
  isOpen: {
    open: false,
    id: 0,
  },
  stuffs: [],
  newShopArray: [],
};

const shop = (state = initialState, action = {}) => {
  switch (action.type) {
    case RANDOM_STUFF:
      return {
        ...state,
        stuffs: [
          ...state.stuffs,
          action.payload.stuffs,
        ],
        newShopArray: [
          ...state.stuffs.slice(0, 9),
        ],
      };
    case EMPTY_ARRAY:
      return {
        ...state,
        newShopArray: [],
      };
    case MODALE_OPEN:
      return {
        ...state,
        isOpen: {
          open: true,
          id: action.payload.id,
        },
      };
    case MODALE_CLOSE:
      return {
        ...state,
        isOpen: {
          ...state.isOpen,
          open: false,
        },
      };
    case ALL_OBJECT:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default shop;
