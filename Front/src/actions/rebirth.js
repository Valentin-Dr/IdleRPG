export const ACTIVATE_REBIRTH = 'ACTIVATE_REBIRTH';

export const activateRebirth = (level) => ({
  type: ACTIVATE_REBIRTH,
  payload: {
    level,
  },
});
