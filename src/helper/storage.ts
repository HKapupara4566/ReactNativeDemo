import AsyncStorage from '@react-native-community/async-storage';

const FAVOURITE_ITEM = '@favourite_item';
const CART_ITEM = '@cart_item';

export const setFavouriteItemData = async (value: string = '') => {
  try {
    await AsyncStorage.setItem(FAVOURITE_ITEM, value);
  } catch (err) {
    console.log(err, '[setFavouriteItemData] AsyncStorage Error');
  }
};

export const getFavouriteItemData = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(FAVOURITE_ITEM);
    return token;
  } catch (err) {
    console.log(err, '[getFavouriteItemData] AsyncStorage Error');
    return null;
  }
};

export const setCartItemData = async (value: string = '') => {
  try {
    await AsyncStorage.setItem(CART_ITEM, value);
  } catch (err) {
    console.log(err, '[setCartItemData] AsyncStorage Error');
  }
};

export const getCartItemData = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(CART_ITEM);
    return token;
  } catch (err) {
    console.log(err, '[getCartItemData] AsyncStorage Error');
    return null;
  }
};
