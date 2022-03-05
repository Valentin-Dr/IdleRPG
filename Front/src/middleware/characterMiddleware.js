import { SPARE_POINTS, UPDATE_EQUIPMENT, UPDATE_VIVRE } from '../actions/character';
import { GET_ALL_UPGRADES, setAllUpgrades } from '../actions/upgrades';
import { logUser } from '../actions/user';
import API from './api';

const characterMiddleware = (store) => (next) => (action) => {
  const foundToken = localStorage.getItem('profile');
  const state = store.getState();
  switch (action.type) {
    case SPARE_POINTS: {
      //MAJ des points attribués à stat de performance du joueur
      const config = {
        method: 'patch',
        url: '/attribute/augment',
        headers: {
          authorization: `${foundToken}`,
        },
        data: {
          characterId: Number(localStorage.characterId),
          attributeId: action.id,
          quantity: action.statistique,
        },
      };
      API(config)
        .then((response) => {
          if (response.status === 204) {
            if (response.headers.authorization) {
              const newToken = response.headers.authorization;
              const foundName = JSON.parse(localStorage.getItem('name'));
              const foundId = JSON.parse(localStorage.getItem('userId'));
              const userAction = logUser(newToken, foundName, foundId);
              store.dispatch(userAction);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case UPDATE_EQUIPMENT: {
      const foundToken = localStorage.getItem('profile');
      //MAJ équipement porté
      const config = {
        method: 'patch',
        url: '/equipment/equipItem',
        headers: {
          authorization: `${foundToken}`,
        },
        data: {
          characterId: Number(localStorage.characterId),
          itemId: action.item.item_id,
        },
      };
      API(config)
        .then((response) => {
          // console.log('response',response);
          if (response.status === 204) {
            if (response.headers.authorization) {
              const newToken = response.headers.authorization;
              const foundName = JSON.parse(localStorage.getItem('name'));
              const foundId = JSON.parse(localStorage.getItem('userId'));
              const userAction = logUser(newToken, foundName, foundId);
              store.dispatch(userAction);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case UPDATE_VIVRE: {
      //MAJ vie après consommation vivres
      const foundToken = localStorage.getItem('profile');
      const config = {
        method: 'patch',
        url: '/useCons',
        headers: {
          authorization: `${foundToken}`,
        },
        data: {
          characterId: Number(localStorage.characterId),
          itemId: action.id,
          quantity: -1,
          plusHp : action.statistique,
        },
      };
      API(config)
        .then((response) => {
          if (response.status === 204) {
            if (response.headers.authorization) {
              const newToken = response.headers.authorization;
              const foundName = JSON.parse(localStorage.getItem('name'));
              const foundId = JSON.parse(localStorage.getItem('userId'));
              const userAction = logUser(newToken, foundName, foundId);
              store.dispatch(userAction);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default characterMiddleware;

