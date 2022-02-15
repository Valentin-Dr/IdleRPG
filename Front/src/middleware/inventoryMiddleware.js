import { spendResourcesForCraft, GET_CRAFTABLE_ITEMS, updateRecipes } from "../actions/craft";
import { GET_ALL_FISH_RESOURCES, updateFishResources } from "../actions/fishing";
import { GET_ALL_MINE_RESOURCES, updateMineResources } from "../actions/mining";
import API from './api';

const inventoryMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case GET_CRAFTABLE_ITEMS: {
      const config = {
        method: 'get',
        url: '/items',
      };
      API(config)
        .then((response) => {
          const craftableItems = response.data.filter((item) => item.item_type_id >= 3);
          store.dispatch(updateRecipes(craftableItems));
        })
        .catch((error) => {
          console.log(error);
          //store.dispatch(loginErrors(error.response.data));
        });
      next(action);
      break;
    };
    case GET_ALL_MINE_RESOURCES: {
      const config = {
        method: 'get',
        url: '/items',
      };
      API(config)
      .then((response) => {
        const allOres = response.data.filter((item) => item.item_type_id === 2);
        store.dispatch(updateMineResources(allOres));
      })
      .catch((error) => {
        console.log(error);
      })
    };
    case GET_ALL_FISH_RESOURCES: {
      const config = {
        method: 'get',
        url: '/items',
      };
      API(config)
      .then((response) => {
        const allFishes = response.data.filter((item) => item.item_type_id === 1);
        store.dispatch(updateFishResources(allFishes));
      })
      .catch((error) => {
        console.log(error);
      })
    }
    default:
      next(action);
  }
};

export default inventoryMiddleware;
