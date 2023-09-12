import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import countriesRouter from './routes/countries';
import connectToMongoDB from './lib/configurations/mongoDB';

dotenv.config({ path: './.env.local' });
connectToMongoDB();

const app = express();
const port: number = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.use('/countries', countriesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
