import { getAxios } from '@/services/Api'

export class CountryService {
  private baseUrl: string;
  private token?: string;

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  public async getCountries() {
    const api = getAxios(this.baseUrl, this.token);

    return api.get('/countries');
  }
}
