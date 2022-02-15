export const SPEND_RESOURCES_FOR_CRAFT = 'SPEND_RESOURCES_FOR_CRAFT';
export const UPDATE_RECIPES_LIST = 'UPDATE_RECIPES_LIST';
export const GET_CRAFTABLE_ITEMS = 'GET_CRAFTABLE_ITEMS';
export const SEND_CRAFTED_ITEM_TO_DB = 'SEND_CRAFTED_ITEM_TO_DB';
export const COOLDOWN_CRAFT_ITEM = 'COOLDOWN_CRAFT_ITEM';
export const ADD_CRAFTED_ITEM_TO_INVENTORY = 'ADD_CRAFTED_ITEM_TO_INVENTORY';

export const addCraftedItemToInv = (data) => ({
  type: ADD_CRAFTED_ITEM_TO_INVENTORY,
  payload: {
    data,
  },
});

export const spendResourcesForCraft = (resource) => ({
  type: SPEND_RESOURCES_FOR_CRAFT,
  payload: {
    resource,
  },
});

export const getCraftableItems = () => ({
  type: GET_CRAFTABLE_ITEMS,
});

export const updateRecipes = (recipes) => ({
  type: UPDATE_RECIPES_LIST,
  payload: {
    recipes,
  },
});

export const sendCraftedItemToDb = (itemId, componentId, componentQuantity, quantity = 1) => ({
  type: SEND_CRAFTED_ITEM_TO_DB,
  payload: {
    itemId,
    componentId,
    componentQuantity,
    quantity,
  },
});

export const setCooldownCraft = () => ({
  type: COOLDOWN_CRAFT_ITEM,
});
