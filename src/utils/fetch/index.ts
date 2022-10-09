import useToast from "/@/components/toast/use-toast";

const request = async (url: string, config: any) => {
  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      // 服务器异常返回
      useToast().show("服务器异常",{type:"danger"});
    }
    return res;
  } catch (error) {
    useToast().show("请求异常",{type:"danger"});
  }
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