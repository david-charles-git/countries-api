import { ObjectId } from 'mongodb';

export type Continent = 'Africa' | 'Antarctica' | 'Asia' | 'Europe' | 'North America' | 'Oceania' | 'South America';

export type Coordinates = [number, number, number?];

export type Currency = {
  code: string;
  name: string;
  symbol: string;
  exchangeRate?: number;
};

export type TimeZone = {
  code: string;
  name: string;
  utcOffset: number;
  _id?: ObjectId | string;
};

export type Country = {
  _id?: ObjectId | string;
  value: string;
  label: string;
  dialCode: string;
  code: string;
  flagIcon: string;
  capitol: {
    name: string;
    coordinates: Coordinates;
  };
  continent: Continent;
  currency: Currency;
  timeZones: TimeZone[];
  language?: string;
  __v?: number;
};

export type CountriesResponse = {
  error: boolean;
  message: string;
  countries: Country[] | null;
};

export type CountryResponse = {
  error: boolean;
  message: string;
  country: Country | null;
};

export type ExchangeRate = {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: any; // an object where the keys are the currency codes and the values are the exchange rates (number)
};

export type ExchangeRatesResponse = {
  error: boolean;
  message: string;
  exchangeRates: any | null; // an object where the keys are the currency codes and the values are the exchange rates (number)
};

export type ExchangeRateResponse = {
  error: boolean;
  message: string;
  exchangeRate: number | null;
};
