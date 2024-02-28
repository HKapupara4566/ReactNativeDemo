import customAxios from './customAxios';

interface ApiCallOptions {
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}

export const callApiGet = ({url, params}: ApiCallOptions) => {
  return customAxios({url, method: 'GET', params});
};

export const callApiPost = ({url, data}: ApiCallOptions) => {
  return customAxios({url, method: 'POST', data});
};

export const callApiPut = ({url, data}: ApiCallOptions) => {
  return customAxios({url, method: 'PUT', data});
};

export const callApiDelete = ({url}: ApiCallOptions) => {
  return customAxios({url, method: 'DELETE'});
};

export const callApiPatch = ({url, data}: ApiCallOptions) => {
  return customAxios({url, method: 'PATCH', data});
};
