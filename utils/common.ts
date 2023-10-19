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

export function formatLongText(text: string) {
	if (!text) return 'Chưa có';
	if (text.length > 200) {
		return text.slice(0, 200) + '...';
	}
	return text;
}

export function isValidURL(str: string) {
	return /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(str);
}
