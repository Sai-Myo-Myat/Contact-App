import Config from 'react-native-config';

const toQueryString = (params: {[k: string]: string}) => {
  return Object.keys(params)
    .filter(k => params[k])
    .map(key => `${key}=${params[key]}`)
    .join('&');
};

export const fetchQuery = async (
  url: string,
  params: {[key: string]: string},
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
) => {
  let resource = Config.baseUrl + url;
  if (method === 'GET' && params) {
    resource += toQueryString(params);
  }
  const resp = await fetch(resource, {
    method: method,
  });

  if (resp.status !== 200 || 201) {
    return new Error('Fetching Error');
  }

  return resp;
};
