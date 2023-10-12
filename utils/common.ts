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
