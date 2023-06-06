import {API_BASE} from '@env';
const toQueryString = (params: {[k: string]: string}) => {
  return Object.keys(params)
    .filter(k => params[k])
    .map(key => `${key}=${params[key]}`)
    .join('&');
};

export const fetchQuery = async (
  url: string,
  params: {[key: string]: string} | null,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
) => {
  let resource = API_BASE + url;
  console.log('API BASE', resource);
  if (method === 'GET' && params) {
    resource += toQueryString(params);
  }
  let resp;
  try {
    resp = await fetch(resource, {
      method: method,
    });
  } catch (err) {
    console.log(
      'Fetching Error',
      err,
      '\n',
      'method: ',
      method,
      '\n',
      'url: ',
      url,
      '\n',
      'resourse: ',
      resource,
    );
  }

  if (resp?.status !== 200 || 201) {
    return new Error('Fetching Error');
  }
  console.log('database', resp);

  return resp;
};
