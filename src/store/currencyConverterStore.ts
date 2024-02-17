import { writable } from 'svelte/store';
import type { Currency } from '../type/Currency';

export const currencies = writable<Currency[]>([]);
export const fromCurrency = writable<string>('USD');
export const toCurrency = writable<string>('UAH');
export const fromAmount = writable<number>(1);
export const toAmount = writable<number>(1);
