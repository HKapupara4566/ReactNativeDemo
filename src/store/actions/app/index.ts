import appActionsConstants from '../../reducers/app/types';

export const setFavouriteArr = (value = {}) => ({
  type: appActionsConstants.SET_FAVOURITE_DATA,
  payload: value,
});

export const setCartArr = (value = {}) => ({
  type: appActionsConstants.SET_CART_DATA,
  payload: value,
});
