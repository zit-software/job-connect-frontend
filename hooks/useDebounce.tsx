import { useEffect, useState } from 'react';

export default function useDebounce(value: any, timeout: number = 500) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const to = setTimeout(() => {
			setDebouncedValue(value);
		}, timeout);

		return () => clearTimeout(to);
	}, [timeout, value]);

	return debouncedValue;
}
