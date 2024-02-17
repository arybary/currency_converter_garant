import { baseUrl } from '../constants/currenciesConst';
import type { Currencies, Currency } from '../type/Currency';

export async function load({ fetch }: any): Promise<Currencies> {
	const res = await fetch(baseUrl);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	const data = (await res.json()) as Currency[];
	return {
		currenciesData: data
	};
}
