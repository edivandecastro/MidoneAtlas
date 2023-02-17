import type { AxiosInstance, RawAxiosRequestHeaders } from 'axios';
import Axios from 'axios';

interface BaseUrl {
  atlas_api_v1: string,
  fake_atlas_api_v1: string,
}

interface Options {
  Authorization?: string | undefined
}

export const baseUrl: BaseUrl = {
  atlas_api_v1: 'http://localhost:3000/api/v1',
  fake_atlas_api_v1: 'https://snapcode.proxy.beeceptor.com'
}

export const getAxios = (urlApi: string, token?: string, formData: boolean = false): AxiosInstance => {
  let options: RawAxiosRequestHeaders = {};
  if (token) {
    options.Authorization = `Bearer ${token}`;
  }

  if (formData) {
    options["Content-Type"] = "multipart/form-data";
  }

  return Axios.create({ baseURL: urlApi, headers: options});
}
