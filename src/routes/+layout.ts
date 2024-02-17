export async function load({ fetch }: any) {
	const res = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
	console.log('hello');
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	const data = await res.json();
	return {
		currencies: data
	};
}
