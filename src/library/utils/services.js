export default function service(serviceName, params) {
  const service = {
    login: {
      method: 'post',
      url: 'mobile2.0/titaniumLoginValidate.php',
      body: params,
    },
    logout: {
      method: 'get',
      url: 'mobile2.0/titaniumLogout.php',
    },
    'upload-image': {
      method: 'post',
      url: 'server/refreshToken',
      body: params,
    },
  };

  return service[serviceName];
}
