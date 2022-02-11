export const SET_WORKING_FISH = 'SET_WORKING_FISH';
export const SET_CURRENT_RESOURCE_FISH = 'SET_CURRENT_RESOURCE_FISH';
export const DECREMENT_COUNTER_FISH = 'DECREMENT_COUNTER_FISH';
export const ALERT_PLAYER_NEEDS_RESOURCE_FISH = 'ALERT_PLAYER_NEEDS_RESOURCE_FISH';
export const ADD_LOG_MESSAGE_FISH = 'ADD_LOG_MESSAGE_FISH';
export const ADD_LEVEL_UP_MESSAGE_FISH = 'ADD_LEVEL_UP_MESSAGE_FISH';
export const ADD_RESOURCE_EXPERIENCE_TO_PLAYER_FISH = 'ADD_RESOURCE_EXPERIENCE_TO_PLAYER_FISH';
export const LEVEL_UP_PLAYER_JOB_FISH = 'LEVEL_UP_PLAYER_JOB_FISH';
export const UPDATE_EXPERIENCE_BAR_PROGRESS_FISH = 'UPDATE_EXPERIENCE_BAR_PROGRESS_FISH';
export const ALLOW_GATHER_RESOURCES = 'ALLOW_GATHER_RESOURCES_FISH';
export const GET_ALL_FISH_RESOURCES = 'GET_ALL_FISH_RESOURCES';
export const UPDATE_FISH_RESOURCES = 'UPDATE_FISH_RESOURCES';
export const GET_FISH_NAME_AND_LEVEL = 'GET_FISH_NAME_AND_LEVEL';
export const SEND_GATHERED_FISH_TO_DB = 'SEND_GATHERED_FISH_TO_DB';
export const UPDATE_FISHING_LEVEL = 'UPDATE_FISHING_LEVEL';

export const setWorking = () => ({
  type: SET_WORKING_FISH,
});

export const alertPlayerResource = () => ({
  type: ALERT_PLAYER_NEEDS_RESOURCE_FISH,
});

export const levelUpJob = () => ({
  type: LEVEL_UP_PLAYER_JOB_FISH,
});

export const addExperienceToPlayer = (experience) => ({
  type: ADD_RESOURCE_EXPERIENCE_TO_PLAYER_FISH,
  payload: {
    experience,
  },
});

export const updateExpBar = (newExpPercentage) => ({
  type: UPDATE_EXPERIENCE_BAR_PROGRESS_FISH,
  payload: {
    newExpPercentage,
  },
});

export const setCurrentResource = (currentResource, currentResourceExperience) => ({
  type: SET_CURRENT_RESOURCE_FISH,
  payload: {
    currentResource,
    currentResourceExperience,
  },
});

export const allowGatherResources = () => ({
  type: ALLOW_GATHER_RESOURCES_FISH,
});

export const addLogMessage = (experience, amount) => ({
  type: ADD_LOG_MESSAGE_FISH,
  payload: {
    experience,
    amount,
  },
});

export const addLevelUpMessage = () => ({
  type: ADD_LEVEL_UP_MESSAGE_FISH,
});

export const getAllFishResources = () => ({
  type: GET_ALL_FISH_RESOURCES,
});

export const updateFishResources = (fishes) => ({
  type: UPDATE_FISH_RESOURCES,
  payload: {
    fishes,
  },
});

export const getFishNameAndLvl = (data) => ({
  type: GET_FISH_NAME_AND_LEVEL,
  payload: {
    data,
  },
});

export const sendFishToDb = (itemId, quantity, plusExp) => ({
  type: SEND_GATHERED_FISH_TO_DB,
  payload: {
    itemId,
    quantity,
    plusExp,
  },
});

export const updateFishingLevel = (newLevel) => ({
  type: UPDATE_FISHING_LEVEL,
  payload: {
    newLevel,
  },
});
