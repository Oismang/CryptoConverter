"use client"

import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import { Grid, IconButton, TextField } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { changeCurrencyAction } from "../actions/change-currecny";
import { ICurrenciesModel } from "../models/currencies";
import { SearchSelect } from "./SearchSelect";

const FIXED_NUMBER = 6;

export function CryptoConverter({ currencies, BTCtoUSDRate }: {
  currencies: ICurrenciesModel[],
  BTCtoUSDRate: number
}) {
  const [rate, setRate] = useState<number>(BTCtoUSDRate);

  const [leftInputValue, setLeftInputValue] = useState<string>("1");
  const [rightInputValue, setRightInputValue] = useState<string>((1 * rate).toString());

  const [leftSelectValue, setLeftSelectValue] = useState<string>("BTC");
  const [rigthSelectValue, setRightSelectValue] = useState<string>("USD");

  const handleLeftInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = Number(event.target.value).toString();

    setLeftInputValue(newValue);
    setRightInputValue((+newValue * rate).toFixed(FIXED_NUMBER));
  }

  const handleRigthInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = Number(event.target.value).toString();

    setRightInputValue(newValue);
    setLeftInputValue((+newValue / rate).toFixed(FIXED_NUMBER));
  }

  const handleLeftSearchSelectChange = useCallback(async (newValue: string) => {
    setLeftSelectValue(newValue);

    const newRate = await changeCurrencyAction(newValue, rigthSelectValue);
    setRate(() => newRate);
    setRightInputValue(() => (+leftInputValue * newRate).toFixed(FIXED_NUMBER));
  }, [leftInputValue, rigthSelectValue])

  const handleRightSearchSelectChange = useCallback(async (newValue: string) => {
    setRightSelectValue(newValue);

    const newRate = await changeCurrencyAction(leftSelectValue, newValue);
    setRate(() => newRate);
    setRightInputValue(() => (+leftInputValue * newRate).toFixed(FIXED_NUMBER));
  }, [leftInputValue, leftSelectValue])

  const handleOnSwapButtonClick = () => {
    setLeftSelectValue(rigthSelectValue);
    setRightSelectValue(leftSelectValue);

    const newRate = +leftInputValue / rate;
    setRate(newRate);
    setRightInputValue(() => (+leftInputValue * newRate).toFixed(FIXED_NUMBER));
  };

  return (
    <Grid item container xs={12} spacing={2}>
      <Grid item xs={12} md={3}>
        <TextField type="number"
          name="left number"
          fullWidth
          value={leftInputValue}
          onChange={handleLeftInputChange}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <SearchSelect
          label="Currencies"
          defaultDescription="Bitcoin"
          options={currencies}
          value={leftSelectValue}
          onChange={handleLeftSearchSelectChange}
        />
      </Grid>
      <Grid item xs={12} md={2} textAlign="center">
        <IconButton size="large"
          onClick={handleOnSwapButtonClick}>
          <SwapHorizontalCircleIcon fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField type="number"
          name="right number"
          fullWidth
          onChange={handleRigthInputChange}
          value={rightInputValue}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <SearchSelect
          label="Currencies"
          defaultDescription="US Dollar"
          options={currencies}
          value={rigthSelectValue}
          onChange={handleRightSearchSelectChange}
        />
      </Grid>
    </Grid>
  );
}
