export const ACTIVATE_REBIRTH = 'ACTIVATE_REBIRTH';

export const activateRebirth = (fruits) => ({
  type: ACTIVATE_REBIRTH,
  payload: {
    fruits,
  },
});
