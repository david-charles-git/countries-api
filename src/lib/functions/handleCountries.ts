import countriesData from '../data/countries.json';
import { Country as CountryModel } from '../models/Country';
import { Country, CountriesResponse, CountryResponse } from '../types/types';

const getAllCountries = async () => {
  var response: CountriesResponse = {
    error: true,
    message: '',
    countries: null,
  };

  try {
    const countries = await CountryModel.find();

    if (!countries) return { ...response, message: 'No countries found' };

    return { error: false, message: 'Countries found', countries: countries };
  } catch (error: any) {
    return { ...response, message: error.message };
  }
};

const getAllCachedCountries = () => {
  return { error: false, message: 'Countries found', countries: countriesData };
};

const getCountryByValue = async (value: string) => {
  var response: CountryResponse = {
    error: true,
    message: '',
    country: null,
  };

  try {
    const country = await CountryModel.findOne({ value });

    if (!country) return { ...response, message: 'No country found' };

    return { ...response, error: false, message: 'Country found', country };
  } catch (error: any) {
    return { ...response, message: error.message };
  }
};

const getCachedCountryByValue = (value: string) => {
  const valueMatch = countriesData.find((country: any) => {
    return country.value === value;
  });

  if (!valueMatch) return { error: true, message: 'No exchange rate found', country: null };

  return { error: false, message: 'Country rate found', country: valueMatch };
};

const createCountry = async (countryData: Country) => {
  var response: CountryResponse = {
    error: true,
    message: '',
    country: null,
  };

  try {
    const country = await CountryModel.create(countryData);

    if (!country) return { ...response, message: 'No country created' };

    return { ...response, error: false, message: 'Country created', country };
  } catch (error: any) {
    return { ...response, message: error.message };
  }
};

const updateCountryById = async (id: string, updateFields?: any[]) => {
  var response: CountryResponse = {
    error: true,
    message: '',
    country: null,
  };

  try {
    const country: any = await CountryModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!country) return { ...response, message: 'Country not found' };

    return { ...response, error: false, message: 'Country updated', country };
  } catch (error: any) {
    return { ...response, message: error.message };
  }
};

const deleteCountryById = async (id: string) => {
  var response: CountryResponse = {
    error: true,
    message: '',
    country: null,
  };

  try {
    const country: any = await CountryModel.findByIdAndDelete(id);

    if (!country) return { ...response, message: 'Country not found' };

    return { ...response, error: false, message: 'Country deleted', country };
  } catch (error: any) {
    return { ...response, message: error.message };
  }
};

export { getAllCountries, getAllCachedCountries, getCountryByValue, getCachedCountryByValue, createCountry, updateCountryById, deleteCountryById };
