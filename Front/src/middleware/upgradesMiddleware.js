import { refreshRebirthFruits } from '../actions/character';
import { getAllUpgrades, GET_ALL_UPGRADES, LEVEL_UP_UPGRADE, refreshLvldUpUpgrade, setAllUpgrades, unlockNewUpgrade, updateCurrentUpgrade } from '../actions/upgrades';
import { logUser } from '../actions/user';
import API from './api';

const upgradesMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case GET_ALL_UPGRADES: {
      const foundToken = localStorage.getItem('profile');
      //MAJ équipement porté
      const config = {
        method: 'get',
        url: '/competences',
        headers: {
          authorization: `${foundToken}`,
        },
        // data: {
        //   characterId: Number(localStorage.characterId),
        //   itemId: action.item.item_id,
        // },
      };
      API(config)
        .then((response) => {
            if (response.headers.authorization) {
              const newToken = response.headers.authorization;
              const foundName = JSON.parse(localStorage.getItem('name'));
              const foundId = JSON.parse(localStorage.getItem('userId'));
              const userAction = logUser(newToken, foundName, foundId);
              store.dispatch(userAction);
              store.dispatch(setAllUpgrades(response.data));
              console.log(response);
            }
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case LEVEL_UP_UPGRADE: {
      const foundToken = localStorage.getItem('profile');
      //MAJ équipement porté
      const config = {
        method: 'post',
        url: '/char/learncompetence',
        headers: {
          authorization: `${foundToken}`,
        },
        data: {
          characterId: Number(localStorage.characterId),
          competenceId: action.payload.id,
          nbFruit: action.payload.fruits,
        },
      };
      API(config)
        .then((response) => {
            if (response.headers.authorization) {
              console.log(response);
              const newToken = response.headers.authorization;
              const foundName = JSON.parse(localStorage.getItem('name'));
              const foundId = JSON.parse(localStorage.getItem('userId'));
              const userAction = logUser(newToken, foundName, foundId);
              store.dispatch(userAction);
              store.dispatch(refreshRebirthFruits(action.payload.fruits));
              store.dispatch(unlockNewUpgrade(response.data));
              // store.dispatch(updateCurrentUpgrade(action.payload.id));
              // store.dispatch(setAllUpgrades(response.data));
              console.log(response);
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

export default upgradesMiddleware;
