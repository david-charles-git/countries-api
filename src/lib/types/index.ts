import { ObjectId } from 'mongodb';

export type Continent = 'Africa' | 'Antarctica' | 'Asia' | 'Europe' | 'North America' | 'Oceania' | 'South America';

export type Coordinates = [number, number, number?];

export type Currency = {
  code: string;
  name: string;
  symbol: string;
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
