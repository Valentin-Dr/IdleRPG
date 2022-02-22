import { combineReducers } from 'redux';

import character from './character';
import inventoryitem from './inventoryitem';
import craft from './craft';
import monstre from './monstre';
import mining from './mining';
import fishing from './fishing';
import user from './user';
import shop from './shop';
import fight from './fight';
import upgrades from './upgrades';



export default combineReducers({
  character, craft, monstre, mining, user, fishing, shop, fight, inventoryitem, upgrades,
});
