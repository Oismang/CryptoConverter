import { ConvertInfoModel, IConvertInfoModel } from '../models/convert-info';
import { CurrenciesModel } from "../models/currencies";
import { ICurrenciesModel } from './../models/currencies';

const baseUrl = process.env.CURRENCY_BASE_URL as string;
const apiKey = process.env.CURRENCY_API_KEY as string;

if (!baseUrl || !apiKey) {
  throw new Error(
    "Please define the CURRENCY_BASE_URL and CURRENCY_API_KEY environment variables inside .env.local"
  );
}

export interface ICurrenciesDTO {
  data: {
    [name: string]: {
      symbol: string;
      name: string;
      symbol_native: string;
      decimal_digits: number;
      rounding: number;
      code: string;
      name_plural: string;
      type: string;
      countries: string[];
    };
  };
}

export interface IConvertInfoDTO {
  meta: {
    last_updated_at: string;
  };
  data: {
    [name: string]: {
      code: string;
      value: string;
    };
  };
}

const mapCurrenciesDTO = (response: ICurrenciesDTO): ICurrenciesModel[] => {
  if (!response || typeof response !== "object" || !response?.data) {
    throw new Error("Cannot parse currencies response object");
  }
  const result: ICurrenciesModel[] = [];

  Object.values(response.data).forEach(value => {
    const currency = new CurrenciesModel(value);
    // I can't pass class instance to client component, so I need to desctrucre the object
    result.push({ name: currency.name, description: currency.description });
  })

  return result;
};

export async function getCurrencies(): Promise<ICurrenciesModel[]> {
  try {
    const response = await fetch(baseUrl + "/currencies", {
      next: { revalidate: 3600 },
      headers: {
        apikey: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch currency list, response status: ${response.status}, error message: ${response.statusText}`
      );
    }

    const responseJson = await response.json();
    const currencies = mapCurrenciesDTO(responseJson);

    return currencies;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

const mapConvertInfoDTO = (response: IConvertInfoDTO, baseCurrency: string): IConvertInfoModel => {
  if (!response || typeof response !== "object" || !response?.data) {
    throw new Error("Cannot parse convert info response object");
  }

  return new ConvertInfoModel(Object.values(response.data)[0], baseCurrency);
};

export async function getConvertInfo(
  from: string,
  to: string
): Promise<IConvertInfoModel> {
  try {
    const searchParams = new URLSearchParams({
      base_currency: from,
      currencies: to,
    }).toString();

    const response = await fetch(baseUrl + "/latest?" + searchParams, {
      next: { revalidate: 3600 },
      headers: {
        apikey: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch convert info, response status: ${response.status}, error message: ${response.statusText}`
      );
    }

    const responseJson = await response.json();
    const convertInfo = mapConvertInfoDTO(responseJson, from);

    return convertInfo;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
