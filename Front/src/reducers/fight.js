import { v4 as uuidv4 } from 'uuid';
import {
  START_FIGHTING,
  DEAL_DAMAGE,
  GET_NEW_RANDOM_MONSTER,
  GET_MONSTER,
  ADD_LOG_MESSAGE_DMG_DEALT,
  ADD_LOG_MESSAGE_DMG_RECEIVED,
  DEATH_OF_PLAYER,
  PLAYER_TOO_WEAK,
  MANUAL_CHANGE_MONSTER_BEFORE,
  MANUAL_CHANGE_MONSTER_AFTER,
  UPDATE_MONSTER_HP,
  ADD_LOG_MESSAGE_DROP_SUCCESS,
  UPDATE_CHARACTER_LEVEL,

} from '../actions/fight';

const initialState = {
  attributes: [],
  logMessages: [],
  isFighting: false,
  buttonTitle: 'Attaque !',
  currentMonster: {},
  currentMonsterHP: 1,
  currentMonsterMaxHP: 1,
  currentMonsterClass: '',
  monsterLoaded: false,
  tooWeak: false,
  hasLeveledUp: false,
  logMessages: [],
  newMonsterIndex: 0,
  autoMonsterSwitch: true,
  currentMonsterName: "fred l'abominable",
  monsters: [
    {
      name: "fred l'abominable",
      life: 500,
      attack: 2,
      endurance: 1,
      dexterite: 0,
      level: 1,
      attributes: [
        {value: 1},
        {value: 1},
        {value: 1},
        {value: 1}
      ],
    },
  ],
};

const fight = (state = initialState, action = {}) => {
  switch (action.type) {
    case START_FIGHTING:
      return {
        ...state,
        isFighting: !state.isFighting,
        buttonTitle: !state.isFighting ? 'Arrêter de combattre' : 'Attaque !',
      };
    case DEAL_DAMAGE:
      return {
        ...state,
        currentMonsterHP: action.payload.data
      };
    case GET_NEW_RANDOM_MONSTER:
      const filteredMonsters = state.monsters.filter((monster) => monster.level <= action.payload.level);
      const lastIndexOfMons = filteredMonsters.length - 1;
      return {
        ...state,
        tooWeak: false,
        newMonsterIndex: action.payload.manual ? state.newMonsterIndex : lastIndexOfMons,
        autoMonsterSwitch: action.payload.manual ? false : true,
        monsterLoaded: true,
        currentMonster: {...state.monsters[action.payload.manual ? state.newMonsterIndex : lastIndexOfMons], life: 200, maxLife: 200},
      };
    case UPDATE_MONSTER_HP:
      return {
        ...state,
        currentMonsterHP: state.currentMonster.attributes[3].value,
        currentMonsterMaxHP: state.currentMonster.attributes[3].value,
        currentMonsterClass: state.currentMonster.name.replace(/['"]+/g, "").replace(/\s/g, ""),
      };
    case MANUAL_CHANGE_MONSTER_BEFORE:
      return {
        ...state,
        newMonsterIndex: state.newMonsterIndex !== 0 ? state.newMonsterIndex - 1 : 0,
      };
    case MANUAL_CHANGE_MONSTER_AFTER:
      return {
        ...state,
        newMonsterIndex: (state.newMonsterIndex + 1) >= state.monsters.length ? state.newMonsterIndex : state.newMonsterIndex + 1,
      };
    case GET_MONSTER:
      return {
        ...state,
        monsters: action.payload.data,
      };
      case ADD_LOG_MESSAGE_DMG_DEALT:
        return {
          ...state,
            logMessages: [
              <p key={uuidv4()} className="greenLog">Vous avez infligé {action.payload.damageDealt} de dégâts</p>,
              ...state.logMessages.slice(0, 99),
            ],
        };
      case ADD_LOG_MESSAGE_DMG_RECEIVED:
        return {
          ...state,
          logMessages: [
            <p key={uuidv4()} className="redLog">Vous avez reçu {action.payload.damageReceived} de dégâts</p>,
            ...state.logMessages.slice(0, 99),
          ],
        };
      case ADD_LOG_MESSAGE_DROP_SUCCESS:
        return {
          ...state,
          logMessages: [
            <p key={uuidv4()} className="dropLog">Vous avez droppé {action.payload.quantity} {action.payload.item} !</p>,
            ...state.logMessages.slice(0, 99),
          ],
        };
      case DEATH_OF_PLAYER:
        return {
          ...state,
          isFighting: false,
          buttonTitle: 'Attaque !',
          logMessages: [
            <p key={uuidv4()} className="redLog">Vous êtes tombé K.O !</p>,
            ...state.logMessages.slice(0, 99),
          ],
        };
      case PLAYER_TOO_WEAK:
        return {
          ...state,
          tooWeak: true,
        }
    default:
      return state;
  }
};

export default fight;
