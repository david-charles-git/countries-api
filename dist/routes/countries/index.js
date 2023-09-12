"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handleCountries_1 = require("../../lib/functions/handleCountries");
const countriesRouter = express_1.default.Router();
// Get all countries
countriesRouter.route('/').get((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countriesResponse = yield (0, handleCountries_1.getAllCountries)();
        if (countriesResponse.error)
            return response.status(400).json(countriesResponse);
        return response.status(200).json(countriesResponse);
    }
    catch (error) {
        console.error(`Get all mongo users error: ${error.message}`);
        return response.status(500).json({ error: true, message: error.message, user: null });
    }
}));
// Get user by value
countriesRouter.route('/:value').get((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { value } = request.params;
    if (!value)
        return response.json({ error: true, message: 'Value is required', user: null });
    try {
        const countriesResponse = yield (0, handleCountries_1.getCountryByValue)(value);
        if (countriesResponse.error)
            return response.status(400).json(countriesResponse);
        return response.status(200).json(countriesResponse);
    }
    catch (error) {
        console.error(`Get mongo user by email error: ${error.message}`);
        return response.status(500).json({ error: true, message: error.message, user: null });
    }
}));
// Create country
countriesRouter.route('/').post((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, label, code, dialCode, continent, flagIcon, capitol, currency, timeZones } = request.body;
    if (!value || !label || !code || !dialCode || !continent || !flagIcon || !capitol || !currency || !timeZones)
        return response.json({ error: true, message: 'All fields are required', user: null });
    try {
        const createdCountry = yield (0, handleCountries_1.createCountry)({ value, label, code, dialCode, continent, flagIcon, capitol, currency, timeZones });
        if (createdCountry.error)
            return response.status(400).json(createdCountry);
        return response.status(201).json(createdCountry);
    }
    catch (error) {
        console.error(`Create mongo user error: ${error.message}`);
        return response.status(500).json({ error: true, message: error.message, user: null });
    }
}));
// Update country by id
countriesRouter.route('/:id').patch((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const updateFields = request.body;
    if (!id)
        return response.json({ error: true, message: 'Id is required', user: null });
    try {
        const updatedCountry = yield (0, handleCountries_1.updateCountryById)(id, updateFields);
        if (updatedCountry.error)
            return response.status(400).json(updatedCountry);
        return response.status(204).json(updatedCountry);
    }
    catch (error) {
        console.error(`Update mongo user by id error: ${error.message}`);
        return response.status(500).json({ error: true, message: error.message, user: null });
    }
}));
// Delete country by id
countriesRouter.route('/:id').delete((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    if (!id)
        return response.json({ error: true, message: 'Id is required', user: null });
    try {
        const deletedCountry = yield (0, handleCountries_1.deleteCountryById)(id);
        if (deletedCountry.error)
            return response.status(400).json(deletedCountry);
        return response.status(204).json(deletedCountry);
    }
    catch (error) {
        console.error(`Delete mongo user by id error: ${error.message}`);
        return response.status(500).json({ error: true, message: error.message, user: null });
    }
}));
exports.default = countriesRouter;
