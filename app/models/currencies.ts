import { ICurrenciesDTO } from "../services/crypto-api";

export interface ICurrenciesModel {
  name: string;
  description: string;
}

export class CurrenciesModel implements ICurrenciesModel {
  name: string;
  description: string;

  constructor(rawData: ICurrenciesDTO["data"][string]) {
    const { code, name } = rawData;

    this.name = typeof code === "string" ? code : "";
    this.description = typeof name === "string" ? name : ""; 
  }
}
