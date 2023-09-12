type Continent = 'Africa' | 'Antarctica' | 'Asia' | 'Europe' | 'North America' | 'Oceania' | 'South America';

type Coordinates = [number, number, number?];

type Currency = {
  code: string;
  name: string;
  symbol: string;
};

type TimeZone = {
  code: string;
  name: string;
  utcOffset: number;
};

type Country = {
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
};

type CountriesResponse = {
  error: boolean;
  message: string;
  countries: Country[] | null;
};

type CountryResponse = {
  error: boolean;
  message: string;
  country: Country | null;
};

export { type CountriesResponse, type CountryResponse, type Continent, type Coordinates, type Currency, type TimeZone, type Country };
