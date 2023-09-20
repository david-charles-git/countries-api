import {
  createCountry,
  getAllCountries,
  updateCountryById,
  deleteCountryById,
  getCountryByValue,
  getAllCachedCountries,
  getCachedCountryByValue,
} from '../../lib/functions/handleCountries';
import express, { Router, Request, Response } from 'express';

const countriesRouter: Router = express.Router();

// Get all countries
countriesRouter.route('/').get(async (request: Request, response: Response) => {
  try {
    // const countriesResponse = await getAllCountries();
    const countriesResponse = getAllCachedCountries();

    if (countriesResponse.error) return response.status(400).json(countriesResponse);

    return response.status(200).json(countriesResponse);
  } catch (error: any) {
    console.error(`Get all Countries error: ${error.message}`);
    return response.status(500).json({ error: true, message: error.message, countries: null });
  }
});

// Get country by value
countriesRouter.route('/:value').get(async (request: Request, response: Response) => {
  const { value } = request.params;

  try {
    // const countriesResponse = await getCountryByValue(value);
    const countriesResponse = getCachedCountryByValue(value);

    if (countriesResponse.error) return response.status(400).json(countriesResponse);

    return response.status(200).json(countriesResponse);
  } catch (error: any) {
    console.error(`Get mongo user by email error: ${error.message}`);
    return response.status(500).json({ error: true, message: error.message, user: null });
  }
});

// Create country
countriesRouter.route('/').post(async (request: Request, response: Response) => {
  const { value, label, code, dialCode, continent, flagIcon, capitol, currency, timeZones } = request.body;

  try {
    const createdCountry = await createCountry({ value, label, code, dialCode, continent, flagIcon, capitol, currency, timeZones });

    if (createdCountry.error) return response.status(400).json(createdCountry);

    return response.status(201).json(createdCountry);
  } catch (error: any) {
    console.error(`Create mongo user error: ${error.message}`);
    return response.status(500).json({ error: true, message: error.message, user: null });
  }
});

// Update country by id
countriesRouter.route('/:id').patch(async (request: Request, response: Response) => {
  const { id } = request.params;
  const updateFields = request.body;

  try {
    const updatedCountry: any = await updateCountryById(id, updateFields);

    if (updatedCountry.error) return response.status(400).json(updatedCountry);

    return response.status(204).json(updatedCountry);
  } catch (error: any) {
    console.error(`Update mongo user by id error: ${error.message}`);
    return response.status(500).json({ error: true, message: error.message, user: null });
  }
});

// Delete country by id
countriesRouter.route('/:id').delete(async (request: Request, response: Response) => {
  const { id } = request.params;

  try {
    const deletedCountry: any = await deleteCountryById(id);

    if (deletedCountry.error) return response.status(400).json(deletedCountry);

    return response.status(204).json(deletedCountry);
  } catch (error: any) {
    console.error(`Delete mongo user by id error: ${error.message}`);
    return response.status(500).json({ error: true, message: error.message, user: null });
  }
});

export default countriesRouter;
