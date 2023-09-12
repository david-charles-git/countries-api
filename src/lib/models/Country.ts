import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  dialCode: { type: String, required: true },
  code: { type: String, required: true },
  flagIcon: { type: String, required: true },
  capitol: {
    name: { type: String, required: true },
    coordinates: [{ type: Number, required: true }],
  },
  continent: { type: String, required: true },
  currency: {
    code: { type: String, required: true },
    name: { type: String, required: true },
    symbol: { type: String, required: true },
  },
  timeZones: [
    {
      code: { type: String, required: true },
      name: { type: String, required: true },
      utcOffset: { type: Number, required: true },
    },
  ],
});

const Country = mongoose.model('Country', schema);
export default Country;
