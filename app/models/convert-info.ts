import { IConvertInfoDTO } from "../services/crypto-api";

export interface IConvertInfoModel {
  from: string;
  to: string;
  rate: number
}

export class ConvertInfoModel implements IConvertInfoModel {
  from: string;
  to: string;
  rate: number

  constructor(rawData: IConvertInfoDTO["data"][string], baseCurrency: string) {
    const { code, value } = rawData;

    this.from = baseCurrency;
    this.to = typeof code === "string" ? code : "";
    this.rate = typeof value === "number" ? value : 0;
  }
}
