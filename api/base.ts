import {API_BASE} from '@env';
const toQueryString = (params: {[k: string]: string}) => {
  return Object.keys(params)
    .filter(k => params[k])
    .map(key => `${key}=${params[key]}`)
    .join('&');
};

export const fetchQuery = async <T>(
  url: string,
  params: {[key: string]: any} | null,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
) => {
  let resource = API_BASE + url;
  if (method === 'GET' && params) {
    resource += toQueryString(params);
  }

  const body =
    method === 'POST' || method === 'PUT' ? JSON.stringify(params) : undefined;

  console.log('this is body', body);
  const resp = await fetch(resource, {
    method: method,
    body,
  });
  const data = await resp.json();
  console.log(data.status, 'status');
  if (data.status === 200 || data.status === 201) {
    return data.data as T;
  } else {
    const error = new Error(data.message);
    console.log('error: ', error.message);
    return error as T;
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
