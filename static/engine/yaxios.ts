export type Options = {
  method: string;
  query?: string;
  data?: unknown;
  timeout?: number;
  headers?: {[key: string]: string};
};
export type Instance = {
  baseUrl?: string;
  authotization?: string;
  headers?: {[key:string]: string}
};
export type Response = {
  status: number,
  statusText:string,
  data: {
    reason?: string
  }
};
type Union = Instance & Options;
function queryHelper(obj:{}, querykey:string) {
  let query = '';
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object') {
        query += queryHelper(obj[key], `${querykey}[${key}]`);
      } else {
        query += `${querykey}[${key}]=${obj[key]}&`;
      }
    }
  }

  return query;
}
export function queryStringify(obj:{}) {
  if (typeof obj !== 'object') {
    throw new Error('');
  }

  let result = '?';
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object') {
        result += queryHelper(obj[key], key);
      } else {
        result += `${key}=${obj[key]}&`;
      }
    }
  }

  return result.replace(/&$/, '');
}

export class Yaxios {
  instance: Instance;

  constructor(instance: Instance = { baseUrl: '' }) {
    if (typeof instance.baseUrl !== 'string') {
      throw new Error('Должно быть строкой');
    }

    this.instance = instance;
  }

  unionOptions = (options) => Object.assign(options, this.instance);

  get = (url: string, options: Options = { method: 'get' }) => {
    const assign = this.unionOptions(options);
    return this.request(this.instance.baseUrl + url, { ...assign, method: 'get' }, options.timeout);
  };

  post = (url: string, options: Options = { method: 'post' }) => {
    const assign = this.unionOptions(options);
    return this.request(this.instance.baseUrl + url, { ...assign, method: 'post' }, options.timeout);
  };

  put = (url: string, options: Options = { method: 'put' }) => {
    const assign = this.unionOptions(options);
    return this.request(this.instance.baseUrl + url, { ...assign, method: 'put' }, options.timeout);
  };

  delete = (url: string, options: Options = { method: 'delete' }) => {
    const assign = this.unionOptions(options);
    return this.request(this.instance.baseUrl + url, { ...assign, method: 'delete' }, options.timeout);
  };

  request = (url: string, options: Union = { method: 'get' }, timeout = 5000) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let requestUrl = url;
    if (options.query && options.method === 'get') {
      requestUrl += queryStringify(options.query);
    }
    xhr.withCredentials = true;
    xhr.open(options.method, requestUrl);
    if (options.headers) {
      const { headers } = options;
      for (const key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          xhr.setRequestHeader(key, headers[key]);
        }
      }
    }

    xhr.onload = function onl() {
      let responseData: {};
      try {
        responseData = JSON.parse(xhr.response);
      } catch {
        responseData = xhr.response;
      }

      const data:Response = {
        status: xhr.status,
        statusText: xhr.statusText,
        data: responseData,
      };
      if (String(xhr.status).startsWith('2')) {
        return resolve(data);
      }

      return reject(data);
    };

    xhr.timeout = timeout;
    xhr.onabort = reject;
    xhr.onerror = reject;
    xhr.ontimeout = reject;
    if (options.method === 'get') {
      xhr.send();
    } else {
      xhr.send(JSON.stringify(options.data));
    }
  });
}
