import { Country } from '@/models/Country';
import { getAxios } from '@/services/Api'

export class CountryService {
  private baseUrl: string;
  private token?: string;

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  public async all() {
    const api = getAxios(this.baseUrl, this.token);

    return api.get('/countries');
  }

  public async create(country: Country) {
    const api = getAxios(this.baseUrl, this.token);

    return api.post('/countries', { country });
  }
}
