import {
  updateExchangeRates,
  getAllExchangeRates,
  getAllCachedExchangeRates,
  getExchangeRateByCurrencyCode,
  getCachedExchangeRateByCurrencyCode,
} from '../../lib/functions/handleExchangeRates';
import { ExchangeRateResponse } from '../../lib/types/types';
import express, { Router, Request, Response } from 'express';

const exchangeRateRouter: Router = express.Router();

// Get exchange rates
exchangeRateRouter.route('/').get(async (request: Request, response: Response) => {
  try {
    // const exchangeRatesResponse = await getAllExchangeRates();
    const exchangeRatesResponse = getAllCachedExchangeRates();

    if (exchangeRatesResponse.error) return response.status(400).json(exchangeRatesResponse);

    return response.status(200).json(exchangeRatesResponse);
  } catch (error: any) {
    console.error(`Get all mongo users error: ${error.message}`);
    return response.status(500).json({ error: true, message: error.message, user: null });
  }
});

// Get exchange rate by currency code
exchangeRateRouter.route('/:code').get(async (request: Request, response: Response) => {
  try {
    const { code } = request.params;
    // const exchangeRateResponse: ExchangeRateResponse = await getExchangeRateByCurrencyCode(code);
    const exchangeRateResponse: ExchangeRateResponse = getCachedExchangeRateByCurrencyCode(code);

    if (exchangeRateResponse.error) return response.status(400).json(exchangeRateResponse);

    return response.status(200).json({ error: false, message: 'Exchange rate found', exchangeRate: exchangeRateResponse.exchangeRate });
  } catch (error: any) {
    console.error(`Get all mongo users error: ${error.message}`);
    return response.status(500).json({ error: true, message: error.message });
  }
});

// Update exchange rates
exchangeRateRouter.route('/update').post(async (request: Request, response: Response) => {
  try {
    const updateExchangeRatesResponse = await updateExchangeRates();

    if (!updateExchangeRatesResponse) return response.status(400).json({ error: true, message: 'Failed to update exchange rates' });

    return response.status(200).json({ error: false, message: 'Exchange rates updated successfully' });
  } catch (error: any) {
    console.error(`Get all mongo users error: ${error.message}`);
    return response.status(500).json({ error: true, message: error.message });
  }
});

export default exchangeRateRouter;
