export const POSTER_CATEGORY = 'POSTER_CATEGORY';
export const POSTER_EQUIP = 'POSTER_EQUIP';
export const SET_DETAILS = 'SET_DETAILS';
export const CLOSE_DETAILS = 'CLOSE_DETAILS';
export const UPDATE_EQUIPMENT = 'UPDATE_EQUIPMENT';
export const EQUIP_ITEM_BACK_TO_INV = 'EQUIP_ITEM_BACK_TO_INV';
export const UPDATE_VIVRE = 'UPDATE_VIVRE';
export const SPARE_POINTS = 'SPARE_POINTS';
export const UPDATE_NBR_FIELD = 'UPDATE_NBR_FIELD';
export const SET_CHARACTER_DATA = 'SET_CHARACTER_DATA';
export const BUY_ITEM = 'BUY_ITEM';
export const CHANGE_SHOWN_ITEMS_INV = 'CHANGE_SHOWN_ITEMS_INV';
export const CHANGE_SHOWN_ITEMS_ID = 'CHANGE_SHOWN_ITEMS_ID';
export const REFRESH_SHOWN_ITEMS = 'REFRESH_SHOWN_ITEMS';


export const changeShownItems = (data) => ({
  type: CHANGE_SHOWN_ITEMS_INV,
  payload: {
    data,
  },
});

export const changeShownId = (id) => ({
  type: CHANGE_SHOWN_ITEMS_ID,
  payload: {
    id,
  },
});

export const refreshShownItemsAuto = () => ({
  type: REFRESH_SHOWN_ITEMS,
});

export const posterCategory = (category) => ({
  type: POSTER_CATEGORY,
  category: category,
});

export const posterEquipment = (posterEquip) => ({
  type: POSTER_EQUIP,
  posterEquip: posterEquip,
});

export const setDetails = (detailsObj) => ({
  type: SET_DETAILS,
  detailsObj: detailsObj,
});

export const closeDetails = () => ({
  type: CLOSE_DETAILS,
});

export const updateEquip = (item) => ({
  type: UPDATE_EQUIPMENT,
  item,
});

export const updateVivre = (name, statistique, id) => ({
  type: UPDATE_VIVRE,
  name:name,
  statistique: statistique,
  id: id,
});

export const sparePoints = (name, statistique, id) => ({
  type: SPARE_POINTS,
  name:name,
  statistique: statistique,
  id: id,
});

export const updateNbrField = (value, name, min, max) => ({
  type: UPDATE_NBR_FIELD,
  value : value, 
  name: name,
  min: min, 
  max: max,
});

export const setCharacterData = (data) => ({
  type: SET_CHARACTER_DATA,
  data: data,
});

export const buyItem = (gold) => ({
  type: BUY_ITEM,
  payload: {
    gold,
  },
});

export const equipBackToInv = (item) => ({
  type: EQUIP_ITEM_BACK_TO_INV,
  payload: {
    item,
  },
});
