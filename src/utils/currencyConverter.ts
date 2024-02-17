import type { Currency } from '../type/Currency';

export const convertCurrency = (
	currencies: Record<string, Currency>,
	fromCurrency: string,
	toCurrency: string,
	amount: number
): number => {
	const fromRate = currencies[fromCurrency]?.rate || 1;
	const toRate = currencies[toCurrency]?.rate || 1;
	return parseFloat(((amount * fromRate) / toRate).toFixed(2));
};
