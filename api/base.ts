import {API_BASE} from '@env';
const toQueryString = (params: {[k: string]: string}) => {
  return Object.keys(params)
    .filter(k => params[k])
    .map(key => `${key}=${params[key]}`)
    .join('&');
};

export const fetchQuery = async <T>(
  url: string,
  params: {[key: string]: string} | null,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
) => {
  let resource = API_BASE + url;
  // console.log('API BASE', resource);
  if (method === 'GET' && params) {
    resource += toQueryString(params);
  }

  const resp = await fetch(resource, {
    method: method,
  });
  const data = await resp.json();
  console.log(data.status, 'status');
  if (data.status === 200 || data.status === 201) {
    return data.data as T;
  }
};

// console.log(
//   'Fetching Error',
//   err,
//   '\n',
//   'method: ',
//   method,
//   '\n',
//   'url: ',
//   url,
//   '\n',
//   'resourse: ',
//   resource,
// );
