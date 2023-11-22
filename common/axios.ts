import axios, { Method, RawAxiosRequestHeaders } from "axios";

export type AxiosParams = {
  url: string;
  method: Method;
  data?: any;
  headers?: RawAxiosRequestHeaders;
};

const baseFetch = async ({ url, method, data, headers }: AxiosParams) => {
  const token =
    typeof window !== "undefined"
      ? localStorage?.getItem("access-token")
      : undefined;

  const request = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    url,
    method,
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  };

  try {
    const result = await axios(request);
    return result?.data;
  } catch (error) {
    console.log("요청 실패", request);
    console.error(error);
  }
};

const fetcher = (url: string) => {
  return baseFetch({ url, method: "GET" });
};

const postRequest = (url: string, arg: any) => {
  return baseFetch({ url, method: "POST", data: arg });
};

const patchRequest = (url: string, arg: any) => {
  return baseFetch({ url, method: "PATCH", data: arg });
};

const putRequest = (url: string, arg: any) => {
  return baseFetch({ url, method: "PUT", data: arg });
};

const deleteRequest = (url: string) => {
  return baseFetch({ url, method: "DELETE" });
};

export { fetcher, postRequest, patchRequest, putRequest, deleteRequest };
