import { writable } from 'svelte/store';
import type { Currency } from '../type/Currency';
import { currencyUAH } from '../constants/currenciesConst';

export const currencies = writable<Currency[]>([]);
export const currenciesForConverter = writable<Record<string, Currency>>({});
export const fromCurrency = writable<string>('USD');
export const toCurrency = writable<string>('UAH');
export const fromAmount = writable<number>(1);
export const toAmount = writable<number>(1);
export const rateCurrencyConverter = writable<number>(1);

export function setCurrencies(apiCurrencies: Currency[]) {
	const currenciesPlusUAH = [currencyUAH, ...apiCurrencies];
	currencies.set(currenciesPlusUAH);
}

export function setCurrenciesForConverter(apiCurrencies: Currency[]) {
	const hashMap = apiCurrencies.reduce(
		(acc, curr) => {
			acc[curr.cc] = curr;
			return acc;
		},
		{} as Record<string, Currency>
	);

	currenciesForConverter.set(hashMap);
}

export const getRateCurrency = (
	currencies: Record<string, Currency>,
	fromCurrency: string,
	toCurrency: string
) => {
	const fromRate = currencies[fromCurrency]?.rate || 1;
	const toRate = currencies[toCurrency]?.rate || 1;
	const newRateForConvert = fromRate / toRate;
	return rateCurrencyConverter.set(newRateForConvert);
};
