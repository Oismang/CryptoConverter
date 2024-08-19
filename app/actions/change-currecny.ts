"use server"

import { getConvertInfo } from "../services/crypto-api";

export const changeCurrencyAction = async (from: string, to: string): Promise<number> => {
  const convertInfo = await getConvertInfo(from, to);

  return convertInfo.rate;
}
