import { CountryApi } from "@/utils/interfaces";

export class Country {
  private id?: string
  private name: string
  private locale: string
  private acronym: string

  constructor({ id, name, locale, acronym }: CountryApi) {
    this.id = id;
    this.name = name;
    this.locale = locale;
    this.acronym = acronym;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getLocale(): string {
    return this.locale;
  }

  public setLocale(locale: string): void {
    this.locale = locale;
  }

  public getAcronym(): string {
    return this.acronym;
  }

  public setAcronym(acronym: string): void {
    this.acronym = acronym;
  }
}
