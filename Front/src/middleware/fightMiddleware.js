import { addStatsPoints, ADD_STATS_POINTS_AFTER_LVL_UP, updateCharacterLevel, updateLevel, UPDATE_AFTER_FIGHT } from '../actions/fight';
import { logUser } from '../actions/user';
import API from './api';

const fightMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case UPDATE_AFTER_FIGHT: {
      const characterId = localStorage.getItem('characterId');
      const foundToken = localStorage.getItem('profile');

      const config = {
        method: 'patch',
        url: '/fight',
        headers: {
          // Je mets mon token dans le header "Authorization"
          authorization: `${foundToken}`,
        },
        data: {
          characterId: parseInt(characterId, 10),
          newHp: action.newHp,
          hasWin: action.hasWin,
          expValue: action.expValue,
          goldValue: action.goldValue,
          hasLoot: action.hasLoot,
          itemId: action.cmr.item_id,
          quantity: action.cmr.quantity,
        }
      };
      API(config)
        .then((response) => {
          if (response.headers.authorization) {
            const newToken = response.headers.authorization;
            const foundName = JSON.parse(localStorage.getItem('name'));
            const foundId = JSON.parse(localStorage.getItem('userId'));
            const userAction = logUser(newToken, foundName, foundId);
            store.dispatch(userAction);
            if(state.character.level !== response.data.level) {
              store.dispatch(updateCharacterLevel(response.data));
              store.dispatch(addStatsPoints());
            }
          }
          //console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    };
    case ADD_STATS_POINTS_AFTER_LVL_UP: {
      const characterId = localStorage.getItem('characterId');
      const foundToken = localStorage.getItem('profile');
      const config = {
        method: 'patch',
        url: '/addstatspoints',
        headers: {
          // Je mets mon token dans le header "Authorization"
          authorization: `${foundToken}`,
        },
        data: {
          characterId: parseInt(characterId, 10),
        }
      };
      API(config)
        .then((response) => {
          // if (response.headers.authorization) {
          //   const newToken = response.headers.authorization;
          //   const foundName = JSON.parse(localStorage.getItem('name'));
          //   const foundId = JSON.parse(localStorage.getItem('userId'));
          //   const userAction = logUser(newToken, foundName, foundId);
          //   store.dispatch(userAction);
          // }
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    };
    default:
      next(action);
  }
};

export default fightMiddleware;
