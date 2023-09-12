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
exports.deleteCountryById = exports.updateCountryById = exports.createCountry = exports.getCountryByValue = exports.getAllCountries = void 0;
const Country_1 = __importDefault(require("../models/Country"));
const getAllCountries = () => __awaiter(void 0, void 0, void 0, function* () {
    var response = {
        error: true,
        message: '',
        countries: null,
    };
    try {
        const countries = yield Country_1.default.find();
        if (!countries)
            return Object.assign(Object.assign({}, response), { message: 'No countries found' });
        return Object.assign(Object.assign({}, response), { error: false, message: 'Countries found', countries });
    }
    catch (error) {
        return Object.assign(Object.assign({}, response), { message: error.message });
    }
});
exports.getAllCountries = getAllCountries;
const getCountryByValue = (value) => __awaiter(void 0, void 0, void 0, function* () {
    var response = {
        error: true,
        message: '',
        country: null,
    };
    if (!value)
        return Object.assign(Object.assign({}, response), { message: 'No value provided' });
    try {
        const country = yield Country_1.default.findOne({ value });
        if (!country)
            return Object.assign(Object.assign({}, response), { message: 'No country found' });
        return Object.assign(Object.assign({}, response), { error: false, message: 'Country found', country });
    }
    catch (error) {
        return Object.assign(Object.assign({}, response), { message: error.message });
    }
});
exports.getCountryByValue = getCountryByValue;
const createCountry = ({ value, label, code, dialCode, continent, flagIcon, capitol, currency, timeZones, }) => __awaiter(void 0, void 0, void 0, function* () {
    var response = {
        error: true,
        message: '',
        country: null,
    };
    if (!value || !label || !code || !dialCode || !continent || !flagIcon || !capitol || !currency || !timeZones)
        return Object.assign(Object.assign({}, response), { message: 'All fields are required' });
    try {
        const country = yield Country_1.default.create({ value, label, code, dialCode, continent, flagIcon, capitol, currency, timeZones });
        if (!country)
            return Object.assign(Object.assign({}, response), { message: 'No country created' });
        return Object.assign(Object.assign({}, response), { error: false, message: 'Country created', country });
    }
    catch (error) {
        return Object.assign(Object.assign({}, response), { message: error.message });
    }
});
exports.createCountry = createCountry;
const updateCountryById = (id, updateFields) => __awaiter(void 0, void 0, void 0, function* () {
    var response = {
        error: true,
        message: '',
        country: null,
    };
    if (!id)
        return Object.assign(Object.assign({}, response), { message: 'Id is required' });
    try {
        const country = yield Country_1.default.findByIdAndUpdate(id, updateFields, {
            new: true,
        });
        if (!country)
            return Object.assign(Object.assign({}, response), { message: 'Country not found' });
        return Object.assign(Object.assign({}, response), { error: false, message: 'Country updated', country });
    }
    catch (error) {
        return Object.assign(Object.assign({}, response), { message: error.message });
    }
});
exports.updateCountryById = updateCountryById;
const deleteCountryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var response = {
        error: true,
        message: '',
        country: null,
    };
    if (!id)
        return Object.assign(Object.assign({}, response), { message: 'Id is required' });
    try {
        const country = yield Country_1.default.findByIdAndDelete(id);
        if (!country)
            return Object.assign(Object.assign({}, response), { message: 'Country not found' });
        return Object.assign(Object.assign({}, response), { error: false, message: 'Country deleted', country });
    }
    catch (error) {
        return Object.assign(Object.assign({}, response), { message: error.message });
    }
});
exports.deleteCountryById = deleteCountryById;
