import cron from 'node-cron';
import { updateExchangeRates } from '../lib/functions/handleExchangeRates';

const cronTiming: string = '0 0 */2 * *'; // Run every day at midnight

const updateExchangeRateCron = cron.schedule(cronTiming, async () => {
  console.log('Running cron job to update exchange rates');

  try {
    await updateExchangeRates();

    console.log(`Finished running cron job to update exchange rates at ${new Date().toISOString()}`);
  } catch (error) {
    console.log(`Failed to run update exchange rate cron job at ${new Date().toISOString()}`);
  }
});

export default updateExchangeRateCron;
