const request = async (url: string, config: any) => {
  const res = await fetch(url, config);
  if (!res.ok) {
    // 服务器异常返回
    throw Error('服务器异常返回');
  }
  const resJson = res.json();
  return resJson;
};

// GET请求
export const get = (url: string) => {
  return request(url, {method: 'GET',});
};

// POST请求
export const post = (url: string, data: any) => {
  return request(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  });
};