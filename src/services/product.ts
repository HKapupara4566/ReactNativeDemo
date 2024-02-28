import {callApiGet} from './baseApi';
import API from './baseApiEndPoints';

export const getAllProducts = () => {
  return callApiGet({url: API.GET_ALL_PRODUCT});
};

export const getProductDetails = (id: string) => {
  return callApiGet({url: API.GET_PRODUCT_DETAILS + id});
};
