
import { setCharacterData, setStrengthUpgrades } from "../actions/character";
import { GET_ITEMS } from "../actions/craft";
import { SUBSCRIBE_USER, LOG_USER, LOGIN_USER, logUser, CHECK_USER, LOGOUT,} from "../actions/user";
import { getMineNameAndLvl } from '../actions/mining';
import { getMonster, getNewMonster } from '../actions/fight';
import API from './api';
import { getFishNameAndLvl } from '../actions/fishing';

const logMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const calcStrength = (strength, comp) => {
    // todo character attributes 1 value
    // check si le joueur a des compétences débloquées
    if (comp[0] !== null || comp[1] !== undefined) {
      const strUpg = comp.filter((upg) => upg.effect_stat === "force");
      if (strUpg.length > 0) {
        // variable qui va recevoir les données des compétences
        let newStr = strength;
        const rawStrUpgrades = strUpg.filter((elem) => elem.effect_type === "raw");
        const percentStrUpgrades = strUpg.filter((elem) => elem.effect_type === "percentage");
        if (rawStrUpgrades.length > 0) {
          rawStrUpgrades.forEach(elem => {
            console.log("raw");
            newStr += (elem.effect * elem.level_competence);
          });
        };
        if (percentStrUpgrades.length > 0) {
          percentStrUpgrades.forEach(elem => {
            console.log("percentage");
            if (newStr > 0) {
              newStr *= (elem.effect + (elem.increment_effect * elem.level_competence));
            };
          });
        };
        console.log(newStr);
        return newStr;
      };
    } else {
      console.log("return str de base");
      return strength;
    };
  }
  switch (action.type) {
    case SUBSCRIBE_USER: {
      const config = {
        method: 'post',
        url: '/user/subscribe',
        data: {
          email: state.user.email,
          password: state.user.password,
          name: state.user.name,
        },
      };
      API(config)
        .then((response) => {
          if (response.status === 200) {
            store.dispatch(setCharacterData(response.data.character));
            store.dispatch(getMonster(response.data.entities));
            store.dispatch(getNewMonster(false));
            store.dispatch(getMineNameAndLvl(response.data.character.jobs[0]));
            store.dispatch(getFishNameAndLvl(response.data.character.jobs[1]));
            store.dispatch(logUser(response.headers.authorization, response.data.user.name, response.data.user.id));

            localStorage.setItem('characterId', response.data.character.id);
          }
        })
        .catch((error) => {
          console.log(error);
          // store.dispatch(loginErrors(error.response.data));
        })
      next(action);
      break;
    }
    case LOGIN_USER: {
      const config = {
        method: 'post',
        url: '/user/login',
        data: {
          email: state.user.email,
          password: state.user.password,
        },
      };
      API(config)
        .then((response) => {
          if (response.status === 200) {
            store.dispatch(setStrengthUpgrades(calcStrength(response.data.character.attributes[1].value, response.data.character.competences), response.data.character.equipments[3]));
            store.dispatch(setCharacterData(response.data.character));
            store.dispatch(getMonster(response.data.entities));
            store.dispatch(getNewMonster(false));
            store.dispatch(getMineNameAndLvl(response.data.character.jobs[0]));
            store.dispatch(getFishNameAndLvl(response.data.character.jobs[1]));
            store.dispatch(logUser(response.headers.authorization, response.data.user.name, response.data.user.id));
            localStorage.setItem('characterId', response.data.character.id);
          }
        })
        .catch((error) => {
          console.log(error);
        })
      next(action);
      break;
    }
    case CHECK_USER:
      next(action);
      const foundToken = localStorage.getItem('profile');
      const config = {
        method:'post',
        url:'/user/checklogin',
        headers: {
          // Je mets mon token dans le header "Authorization"
          authorization: `${foundToken}`,
        },
      };
      API(config)
      .then((response) => {
        if (response.headers.authorization) {
          const newToken = response.headers.authorization;
          const foundName = JSON.parse(localStorage.getItem('name'));
          const foundId = JSON.parse(localStorage.getItem('userId'));
          if (foundName && foundId) {
            const name = foundName;
            const id = foundId;
            const userAction = logUser(newToken, name, id);
            store.dispatch(userAction);
          };
          console.log(response.data.character.equipments[3]);
          store.dispatch(setStrengthUpgrades(calcStrength(response.data.character.attributes[1].value, response.data.character.competences), response.data.character.equipments[3]));
          store.dispatch(setCharacterData(response.data.character));
          store.dispatch(getMonster(response.data.entities));
          store.dispatch(getNewMonster());
          store.dispatch(getMineNameAndLvl(response.data.character.jobs[0]));
          store.dispatch(getFishNameAndLvl(response.data.character.jobs[1]));
          localStorage.setItem('characterId', response.data.character.id);
        }
      })
      .catch((error)=> {
        console.log(error);
      })
      break;
    case LOGOUT:
      next(action);
      localStorage.removeItem('profile');
      localStorage.removeItem('name');
      localStorage.removeItem('userId');
      break;
    
    default:
      next(action);
  }
};

export default logMiddleware;
