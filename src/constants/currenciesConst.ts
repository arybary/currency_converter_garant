import type { Currency } from '../type/Currency';

export const baseUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

export const staticUrl = 'https://index.minfin.com.ua/exchange/currency';

export const flagUrl = 'http://purecatamphetamine.github.io/country-flag-icons/3x2';

export const currencyUAH: Currency = {
	r030: 980,
	txt: 'Гривня',
	rate: 1.0,
	cc: 'UAH',
	exchangedate: new Date().toLocaleDateString()
};

