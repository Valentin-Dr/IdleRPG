
export const EQUIP_ITEM = 'EQUIP_ITEM';


export const setInventoryItem = (equipeitem) => ({
  type: EQUIP_ITEM,
  equipeitem: equipeitem,
});
