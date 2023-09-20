import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import countriesRouter from './routes/countries';
import exchangeRateRouter from './routes/exchangeRates';
import connectToMongoDB from './lib/configurations/mongoDB';
import updateExchangeRateCron from './cron/updateExchangeRates';

connectToMongoDB();
dotenv.config({ path: './.env.local' });

const app = express();
const port: number = Number(process.env.PORT) || 5001;

app.use(cors());
app.use(express.json());

app.use('/countries', countriesRouter);
app.use('/exchange-rates', exchangeRateRouter);

app.listen(port, () => {
  updateExchangeRateCron.start();
  console.log(`Server is running on port ${port}.`);
});
