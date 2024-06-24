import service from './services';

const fetchWithTimeout = async (url, options, timeout = 60000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject('timeout'), timeout)),
  ]);
};

export const request = async (
  serviceName,
  query = {},
  controller = new AbortController(),
) => {
  const apiDomain = 'mobile.hccapp.com';

  const serviceDetails = service(serviceName, query);

  const {method, url, body} = serviceDetails;

  const serviceApi = `https://${apiDomain}/${url}`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };

  const publicApiTimeout = 2 * 60000; // 2 min

  try {
    const response = await fetchWithTimeout(
      serviceApi,
      {
        method,
        headers,
        signal: controller.signal,
        body,
      },
      publicApiTimeout,
    );

    if (response.status === 200) {
      try {
        const json = await response.json();
        return json;
      } catch {
        return undefined;
      }
    } else {
      return responseInterceptor(serviceName, response);
    }
  } catch (err) {
    // fetchWithTimeout - request got timed out.
    if (err === 'timeout') {
      controller && controller.abort();

      if (!retry) {
        console.log('Request timed out, retrying...');
        return request(serviceName, query, new AbortController());
      } else {
        return Promise.reject('REQUEST_TIME_OUT');
      }
    }

    // catch all exceptions
    console.log(err);
    return Promise.reject('CATCH ALL ERROR');
  }
};

const responseInterceptor = async (service, response) => {
  if (response.status) console.log('Failed with status code:', response.status);
  else console.log('Failed with null response');

  return Promise.reject('ERROR');
};
