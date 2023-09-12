import express, { Router, Request, Response } from 'express';
import { getAllCountries, getCountryByValue, createCountry, updateCountryById, deleteCountryById } from '../../lib/functions/handleCountries';

const countriesRouter: Router = express.Router();

// Get all countries
countriesRouter.route('/').get(async (request: Request, response: Response) => {
  try {
    const countriesResponse = await getAllCountries();

    if (countriesResponse.error) return response.status(400).json(countriesResponse);

    return response.status(200).json(countriesResponse);
  } catch (error: any) {
    console.error(`Get all mongo users error: ${error.message}`);
    return response.status(500).json({ error: true, message: error.message, user: null });
  }
});

// Get user by value
countriesRouter.route('/:value').get(async (request: Request, response: Response) => {
  const { value } = request.params;

  if (!value) return response.json({ error: true, message: 'Value is required', user: null });

  try {
    const countriesResponse = await getCountryByValue(value);

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

  if (!value || !label || !code || !dialCode || !continent || !flagIcon || !capitol || !currency || !timeZones)
    return response.json({ error: true, message: 'All fields are required', user: null });

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

  if (!id) return response.json({ error: true, message: 'Id is required', user: null });

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

  if (!id) return response.json({ error: true, message: 'Id is required', user: null });

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
