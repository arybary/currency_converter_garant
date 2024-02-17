import type { Currency } from '../type/Currency';

export const baseUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

export const currencyUAH: Currency = {
	r030: 980,
	txt: 'Гривня',
	rate: 1.0,
	cc: 'UAH',
	exchangedate: new Date().toLocaleDateString()
};
