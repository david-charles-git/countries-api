import * as fs from 'fs';
import axios from 'axios';
import countriesData from '../data/countries.json';
import exchangeRateData from '../data/exchange-rates.json';
import { Country, Currency, ExchangeRatesResponse, ExchangeRateResponse } from '../types/types';

const countries: any[] = countriesData;
const countriesOutputPath: string = 'src/lib/data/countries.json';
const endpoint: string = 'http://api.exchangeratesapi.io/v1/latest';
const exchangeRatesOutputPath: string = 'src/lib/data/exchange-rates.json';

const updateExchangeRates: () => Promise<boolean> = async () => {
  try {
    const exchangeRateResponse = await getAllExchangeRates();

    if (exchangeRateResponse.error) return false;

    const { exchangeRates } = exchangeRateResponse;
    const updatedCountries: Country[] = [];

    for (let i = 0; i < countries.length; i++) {
      const country: Country = countries[i];
      const { currency } = country;
      const codeMatch = exchangeRates.find((exchangeRate: any) => {
        const base = Object.keys(exchangeRate)[0];
        return base === currency.code;
      });
      const currencyRate: number = codeMatch ? (Object.values(codeMatch)[0] as number) : 0;
      const updatedCurrency: Currency = { ...currency, exchangeRate: currencyRate };
      const updatedCountry: Country = { ...country, currency: updatedCurrency };

      updatedCountries.push(updatedCountry);
    }

    const countriesJsonString = JSON.stringify(updatedCountries, null, 2);
    const exchangeRatesJsonString = JSON.stringify(exchangeRates, null, 2);

    await fs.promises.writeFile(countriesOutputPath, countriesJsonString, 'utf8');
    await fs.promises.writeFile(exchangeRatesOutputPath, exchangeRatesJsonString, 'utf8');

    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  }
};

const getAllExchangeRates: () => Promise<ExchangeRatesResponse> = async () => {
  var response: ExchangeRatesResponse = {
    error: true,
    message: '',
    exchangeRates: null,
  };

  try {
    const { data } = await axios.get(`${endpoint}?access_key=${process.env.EXCHANGE_RATES_API_KEY}`);

    if (!data) return { ...response, message: 'No exchange rates found' };

    const { success, timestamp, base, date, rates } = data;

    if (!success) return { ...response, message: 'No exchange rates found' };

    const GBP: number = rates.GBP;
    const conversionWithGbpAsBase: any = 1 / GBP;
    const convertedRates = Object.keys(rates).map((key) => {
      return { [key]: rates[key] * conversionWithGbpAsBase };
    });

    return { error: false, message: 'Exchange rates found', exchangeRates: convertedRates };
  } catch (error: any) {
    return { ...response, message: error.message };
  }
};

const getAllCachedExchangeRates: () => ExchangeRatesResponse = () => {
  return { error: false, message: 'Exchange rates found', exchangeRates: exchangeRateData };
};

const getExchangeRateByCurrencyCode: (currencyCode: string) => Promise<any> = async (currencyCode) => {
  var response: ExchangeRateResponse = {
    error: true,
    message: '',
    exchangeRate: null,
  };

  try {
    const { data } = await axios.get(`${endpoint}?access_key=${process.env.EXCHANGE_RATES_API_KEY}&symbols=${currencyCode},GBP`);

    if (!data) return { ...response, message: 'No exchange rates found' };

    const { success, timestamp, base, date, rates } = data;

    if (!success || rates.length <= 1) return { ...response, message: 'No exchange rate found' };

    const GBP: number = rates.GBP;
    const conversionWithGbpAsBase: any = 1 / GBP;
    const convertedRates = Object.keys(rates).map((key) => {
      return { [key]: rates[key] * conversionWithGbpAsBase };
    });

    return { error: false, message: 'Exchange rate found', exchangeRate: convertedRates[0] };
  } catch (error: any) {
    console.error(error);
    return { ...response, message: error.message };
  }
};

const getCachedExchangeRateByCurrencyCode: (currencyCode: string) => any = (currencyCode) => {
  const codeMatch = exchangeRateData.find((exchangeRate: any) => {
    const base = Object.keys(exchangeRate)[0];
    return base === currencyCode;
  });

  if (!codeMatch) return { error: true, message: 'No exchange rate found', exchangeRate: null };

  return { error: false, message: 'Exchange rate found', exchangeRate: codeMatch };
};

export { getAllExchangeRates, getAllCachedExchangeRates, getExchangeRateByCurrencyCode, getCachedExchangeRateByCurrencyCode, updateExchangeRates };
