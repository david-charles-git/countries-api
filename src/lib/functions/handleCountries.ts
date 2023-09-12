import { Country as CountryModel } from '../models/Country';
import { Country, CountriesResponse, CountryResponse } from '../types';

const getAllCountries = async () => {
  var response: CountriesResponse = {
    error: true,
    message: '',
    countries: null,
  };

  try {
    const countries = await CountryModel.find();

    if (!countries) return { ...response, message: 'No countries found' };

    return { ...response, error: false, message: 'Countries found', countries };
  } catch (error: any) {
    return { ...response, message: error.message };
  }
};

const getCountryByValue = async (value: string) => {
  var response: CountryResponse = {
    error: true,
    message: '',
    country: null,
  };

  if (!value) return { ...response, message: 'No value provided' };

  try {
    const country = await CountryModel.findOne({ value });

    if (!country) return { ...response, message: 'No country found' };

    return { ...response, error: false, message: 'Country found', country };
  } catch (error: any) {
    return { ...response, message: error.message };
  }
};

const createCountry = async (countryData: Country) => {
  var response: CountryResponse = {
    error: true,
    message: '',
    country: null,
  };

  if (!countryData) return { ...response, message: 'All fields are required' };

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

  if (!id) return { ...response, message: 'Id is required' };

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

  if (!id) return { ...response, message: 'Id is required' };

  try {
    const country: any = await CountryModel.findByIdAndDelete(id);

    if (!country) return { ...response, message: 'Country not found' };

    return { ...response, error: false, message: 'Country deleted', country };
  } catch (error: any) {
    return { ...response, message: error.message };
  }
};

export { getAllCountries, getCountryByValue, createCountry, updateCountryById, deleteCountryById };
