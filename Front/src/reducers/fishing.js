import { v4 as uuidv4 } from 'uuid';
import {
  SET_WORKING_FISH,
  SET_CURRENT_RESOURCE_FISH,
  ALERT_PLAYER_NEEDS_RESOURCE_FISH,
  ADD_LOG_MESSAGE_FISH,
  ADD_RESOURCE_EXPERIENCE_TO_PLAYER_FISH,
  ADD_LEVEL_UP_MESSAGE_FISH,
  UPDATE_EXPERIENCE_BAR_PROGRESS_FISH,
  UPDATE_FISH_RESOURCES,
  GET_FISH_NAME_AND_LEVEL,
  UPDATE_FISHING_LEVEL
} from '../actions/fishing';
import { ACTIVATE_REBIRTH } from '../actions/rebirth';

const initialState = {
    name: 'Pêche',
    level: 1,
    experience: 0,
    currentResource: '',
    currentResourceExperience: 0,
    isWorking: false,
    buttonTitle: 'Commencer à travailler',
    actionTime: 2000,
    baseReward: 2,
    logMessages: [],
    resources: [],
};

const jobs = (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTIVATE_REBIRTH:
      return {
        ...state,
        level: 1,
        experience: 0,
        currentResource: '',
        currentResourceExperience: 0,
        isWorking: false,
        buttonTitle: 'Commencer à travailler',
        logMessages: [],
      }
    case SET_WORKING_FISH:
      return {
        ...state,
          isWorking: !state.isWorking,
          buttonTitle: !state.isWorking ? `Vous récoltez "${state.currentResource}"` : "Commencer à travailler",
      };
    case SET_CURRENT_RESOURCE_FISH:
      return {
        ...state,
          currentResource: action.payload.currentResource,
          currentResourceExperience: action.payload.currentResourceExperience,
          buttonTitle: state.isWorking ? `Vous récoltez "${action.payload.currentResource}"` : "Commencer à travailler",
      };
      case ALERT_PLAYER_NEEDS_RESOURCE_FISH:
        return {
          ...state,
            buttonTitle: 'Choisissez un poisson',
        };
        case ADD_LOG_MESSAGE_FISH:
          const am = action.payload.amount;
          const xp = action.payload.experience;
          return {
            ...state,
              experience: state.experience + state.currentResourceExperience,
              logMessages: [
                <p key={uuidv4()}>
                  Vous avez récupéré {am} {state.currentResource}{am > 1 && 's'} et {xp} point{xp > 1 && 's'} d'expérience
                </p>,
                ...state.logMessages.slice(0, 99),
              ],
          };
        case ADD_LEVEL_UP_MESSAGE_FISH:
          return {
            ...state,
              logMessages: [
                <p key={uuidv4()}>Vous êtes passé niveau {state.level} en {state.name}!</p>,
                ...state.logMessages.slice(0, 99),
              ]
          }
          case ADD_RESOURCE_EXPERIENCE_TO_PLAYER_FISH:
            return {
              ...state,
            };
          case UPDATE_FISH_RESOURCES:
            return {
              ...state,
              resources: [
                ...action.payload.fishes,
              ]
            };
            case GET_FISH_NAME_AND_LEVEL:
              return {
                ...state,
                name: action.payload.data.name,
                level: action.payload.data.level,
                experience: action.payload.data.exp,
              };
            case UPDATE_FISHING_LEVEL:
              if (state.level !== action.payload.newLevel) {
                return {
                  ...state,
                  level: action.payload.newLevel,
                  logMessages: [
                    <p key={uuidv4()}>Vous êtes passé niveau {action.payload.newLevel} en Pêche !</p>,
                ...state.logMessages.slice(0, 99),
                  ],
                };
              } else {
                return {
                  ...state,
                  level: action.payload.newLevel,
                };
              };
    default:
      return state;
};
}
export default jobs;
