import type { Currency } from '../type/Currency';

export const convertCurrency = (
	currencies: Currency[],
	fromCurrency: string,
	toCurrency: string,
	amount: number
): number => {
	const fromRate = currencies.find((currency) => currency.cc === fromCurrency)?.rate || 1;
	const toRate = currencies.find((currency) => currency.cc === toCurrency)?.rate || 1;
	return parseFloat(((amount * fromRate) / toRate).toFixed(2));
};
