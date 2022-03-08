export const GET_ALL_UPGRADES = 'GET_ALL_UPGRADES';
export const SET_ALL_UPGRADES = 'SET_ALL_UPGRADES';
export const LEVEL_UP_UPGRADE = 'LEVEL_UP_UPGRADE';
export const UPDATE_CURRENT_UPGRADE = 'UPDATE_CURRENT_UPGRADE';
export const UNLOCK_NEW_UPGRADE = 'UNLOCK_NEW_UPGRADE';

export const unlockNewUpgrade = (competences) => ({
  type: UNLOCK_NEW_UPGRADE,
  payload: {
    competences,
  },
});

export const getAllUpgrades = () => ({
  type: GET_ALL_UPGRADES,
});

export const setAllUpgrades = (data) => ({
  type: SET_ALL_UPGRADES,
  payload: {
    data,
  },
});

export const levelUpUpgrade = (id, fruits) => ({
  type: LEVEL_UP_UPGRADE,
  payload: {
    id,
    fruits,
  },
});

export const updateCurrentUpgrade = (id) => ({
  type: UPDATE_CURRENT_UPGRADE,
  payload: {
    id,
  },
});
