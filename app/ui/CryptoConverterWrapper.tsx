import { getConvertInfo, getCurrencies } from "../services/crypto-api";
import { CryptoConverter } from "./CryptoConverter";

export async function CryptoConverterWrapper() {
  const [defaultConvertInfo, currencies] = await Promise.all([getConvertInfo("BTC", "USD"), getCurrencies()]);

  return (
    <CryptoConverter currencies={currencies} BTCtoUSDRate={defaultConvertInfo.rate} />
  );
}
