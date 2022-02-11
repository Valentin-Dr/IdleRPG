import { SEND_GATHERED_FISH_TO_DB, updateFishingLevel } from '../actions/fishing';
import { SEND_GATHERED_ORE_TO_DB, updateMiningLevel } from '../actions/mining';
import { logUser } from '../actions/user';
import API from './api';

const jobMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case SEND_GATHERED_FISH_TO_DB: {
      const characterId = localStorage.getItem('characterId');
      const foundToken = localStorage.getItem('profile');
      const config = {
        method: 'post',
        url: '/job',
        headers: {
          // Je mets mon token dans le header "Authorization"
          authorization: `${foundToken}`,
        },
        data: {
          itemId: action.payload.itemId,
          quantity: action.payload.quantity,
          jobId: 2,
          characterId: parseInt(characterId, 10),
          plusExp: action.payload.plusExp,
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
            store.dispatch(updateFishingLevel(response.data.level.getjoblevelcharacter));
          };
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    };
    case SEND_GATHERED_ORE_TO_DB: {
      const characterId = localStorage.getItem('characterId');
      const foundToken = localStorage.getItem('profile');
      const config = {
        method: 'post',
        url: '/job',
        headers: {
          // Je mets mon token dans le header "Authorization"
          authorization: `${foundToken}`,
        },
        data: {
          itemId: action.payload.itemId,
          quantity: action.payload.quantity,
          jobId: 1,
          characterId: parseInt(characterId, 10),
          plusExp: action.payload.plusExp,
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
            store.dispatch(updateMiningLevel(response.data.level.getjoblevelcharacter));
          }
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

export default jobMiddleware;
