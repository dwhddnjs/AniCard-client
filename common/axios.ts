import axios, { Method, RawAxiosRequestHeaders } from "axios";

export type AxiosParams = {
  url: string;
  method: Method;
  data?: any;
  headers?: RawAxiosRequestHeaders;
};

const baseFetch = async ({ url, method, data, headers }: AxiosParams) => {
  const token = localStorage.getItem("access-token");
  const apiClient = axios.create({
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
      Authorization: token
        ? `Bearer ${localStorage.getItem("access-token")}`
        : undefined,
    },
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  });

  const request = {
    url,
    method,
    data,
  };

  try {
    const result = await apiClient(request);
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

export { fetcher, postRequest };
