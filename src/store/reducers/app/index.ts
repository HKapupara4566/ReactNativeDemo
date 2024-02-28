import appActionsConstants from './types';

interface AppState {
  favouriteArr: any[];
  cartArr: any[];
}

const initialState: AppState = {
  favouriteArr: [],
  cartArr: [],
};

const appReducer = (state: AppState = initialState, action: any): AppState => {
  switch (action.type) {
    case appActionsConstants.SET_FAVOURITE_DATA:
      return {
        ...state,
        favouriteArr: action.payload,
      };

    case appActionsConstants.SET_CART_DATA:
      return {
        ...state,
        cartArr: action.payload,
      };

    default:
      return state;
  }
};

export default appReducer;
