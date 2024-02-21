import { writable, derived } from 'svelte/store';
import type { Currency } from '../type/Currency';
import { currencyUAH } from '../constants/currenciesConst';

export const currencies = writable<Currency[]>([]);
export const currenciesForConverter = writable<Record<string, Currency>>({});
export const fromCurrency = writable<string>('USD');
export const toCurrency = writable<string>('UAH');
export const fromAmount = writable<number>(1);
export const toAmount = writable<number>(1);

export const typeConvert = writable<'to' | 'from'>('from');

export const setCurrencies = (apiCurrencies: Currency[]) => {
	const currenciesPlusUAH = [currencyUAH, ...apiCurrencies];
	currencies.set(currenciesPlusUAH);
};

export const setCurrenciesForConverter = derived([currencies], ([$currencies]) => {
	const hashMap = $currencies.reduce(
		(acc, curr) => {
			acc[curr.cc] = curr;
			return acc;
		},
		{} as Record<string, Currency>
	);

	currenciesForConverter.set(hashMap);
});

export const getRateCurrency = derived(
	[currenciesForConverter, fromCurrency, toCurrency],
	([$currenciesForConverter, $fromCurrency, $toCurrency]) => {
		const fromRate = $currenciesForConverter[$fromCurrency]?.rate || 1;
		const toRate = $currenciesForConverter[$toCurrency]?.rate || 1;
		const newRateForConvert = fromRate / toRate;
		console.log('rate:', newRateForConvert);
		return newRateForConvert;
	}
);

export const convertCurrency = (amount: number, rate: number) => Number((amount * rate).toFixed(2));

export const convert = derived(
	[getRateCurrency, typeConvert, fromAmount, toAmount],
	([$getRateCurrency, $typeConvert, $fromAmount, $toAmount]) => {
		console.log('convert');
		const reverseRate = 1 / $getRateCurrency;
		return $typeConvert !== 'to'
			? toAmount.set(convertCurrency($fromAmount, $getRateCurrency))
			: fromAmount.set(convertCurrency($toAmount, reverseRate));
	}
);
