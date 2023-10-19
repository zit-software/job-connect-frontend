export function formatVndMoney(amount: number) {
	if (typeof amount === 'number') {
		// Use toLocaleString to format the amount with thousands separators
		const formattedAmount = amount.toLocaleString('vi-VN', {
			style: 'currency',
			currency: 'VND',
		});
		return formattedAmount;
	} else {
		return 'Invalid input. Please provide a number.';
	}
}

export async function downloadURI(uri: string, name: string) {
	const res = await (await fetch(uri)).blob();

	const a = document.createElement('a');
	a.href = URL.createObjectURL(res);
	a.download = name;

	document.body.appendChild(a);

	a.click();
	a.remove();

	URL.revokeObjectURL(a.href);
}
