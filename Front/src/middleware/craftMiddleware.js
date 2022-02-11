import { SEND_CRAFTED_ITEM_TO_DB } from '../actions/craft';
import { logUser } from '../actions/user';
import API from './api';

const craftMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case SEND_CRAFTED_ITEM_TO_DB: {
      const characterId = localStorage.getItem('characterId');
      const foundToken = localStorage.getItem('profile');
      const config = {
        method: 'patch',
        url: '/craft',
        headers: {
          // Je mets mon token dans le header "Authorization"
          authorization: `${foundToken}`,
        },
        data: {
          characterId: parseInt(characterId, 10),
          itemId: action.payload.itemId,
          quantity: action.payload.quantity,
          componentId: action.payload.componentId,
          componentQuantity: -action.payload.componentQuantity,
        }
      };
      API(config)
        .then((response) => {
          if (response.headers.authorization) {
            const newToken = response.headers.authorization;
            const foundName = JSON.parse(localStorage.getItem('name'));
            const foundId = JSON.parse(localStorage.getItem('userId'));
            const userAction = logUser(newToken, foundName, foundId);
            store.dispatch(userAction);
          }
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    };
    default:
      next(action);
  }
};

export default craftMiddleware;
