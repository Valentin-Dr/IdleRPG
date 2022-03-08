import { ACTIVATE_REBIRTH } from '../actions/rebirth';
import { setCharacterData } from "../actions/character";
import { getMineNameAndLvl } from '../actions/mining';
import { getMonster, getNewMonster } from '../actions/fight';
import { getFishNameAndLvl } from '../actions/fishing';
import { logUser } from "../actions/user";
import API from './api';

const rebirthMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case ACTIVATE_REBIRTH: {
      const characterId = localStorage.getItem('characterId');
      const foundToken = localStorage.getItem('profile');

      const config = {
        method: 'patch',
        url: '/char/rebirth',
        headers: {
          // Je mets mon token dans le header "Authorization"
          authorization: `${foundToken}`,
        },
        data: {
          characterId: parseInt(characterId, 10),
          nbFruit: 150000,
        },
      };
      API(config)
        .then((response) => {
          if (response.headers.authorization) {
            const newToken = response.headers.authorization;
            const foundName = JSON.parse(localStorage.getItem('name'));
            const foundId = JSON.parse(localStorage.getItem('userId'));
            const userAction = logUser(newToken, foundName, foundId);
            store.dispatch(userAction);
            store.dispatch(setCharacterData(response.data.character));
            store.dispatch(getMineNameAndLvl(response.data.character.jobs[0]));
            store.dispatch(getFishNameAndLvl(response.data.character.jobs[1]));
            console.log(response);
          }
          // console.log(response);
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

export default rebirthMiddleware;
