import {
  ALL_OBJECT,
  SEND_BUY_ITEM_TO_DB,
  randomStuff,
} from '../actions/shop';
import { logUser } from '../actions/user';
import API from './api';

const shopMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case ALL_OBJECT: {
      const config = {
        method: 'get',
        url: '/items',
      };
      API(config)
        .then((response) => {
          const getRandomStuff = () => {
            for (let i = 0; i < 10; i++) {
              const randomNumber = Math.floor(Math.random() * response.data.length);
              // console.log(randomNumber);
              const randomStuffs = response.data[randomNumber];
              // console.log(randomStuff);
              store.dispatch(randomStuff(randomStuffs));
              // console.log(randomStuffs);
            }
          };
          // store.dispatch(allBuyableObject(response.data));
          getRandomStuff();
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case SEND_BUY_ITEM_TO_DB: {
      const characterId = localStorage.getItem('characterId');
      const foundToken = localStorage.getItem('profile');

      const { product, quantity } = action;

      const config = {
        method: 'patch',
        url: '/shop',
        headers: {
          // Je mets mon token dans le header "Authorization"
          authorization: `${foundToken}`,
        },
        data: {
          characterId: parseInt(characterId, 10),
          itemId: product.id,
          goldValue: -product.attribute.find((att) => att.name === 'prix').value,
          quantity: quantity,
        },
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
    }
    default:
      next(action);
  }
};

export default shopMiddleware;
