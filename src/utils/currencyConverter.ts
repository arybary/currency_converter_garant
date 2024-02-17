import type { Currency } from '../type/Currency';

export const getRateCurrency = (
	currencies: Record<string, Currency>,
	fromCurrency: string,
	toCurrency: string
): number => {
	const fromRate = currencies[fromCurrency]?.rate || 1;
	const toRate = currencies[toCurrency]?.rate || 1;
	return fromRate / toRate;
};

export const convertCurrency = (amount: number, rate: number) =>
	parseFloat((amount * rate).toFixed(2));
