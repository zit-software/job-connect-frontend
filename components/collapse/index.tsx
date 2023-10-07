import { useAutoAnimate } from '@formkit/auto-animate/react';
import { HTMLAttributes } from 'react';

export type CollapseProps = {
	open?: boolean;
	children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;
export default function Collapse({ open, children, ...props }: CollapseProps) {
	const [parent] = useAutoAnimate();
	return (
		<div {...props} ref={parent}>
			{open && children}
		</div>
	);
}
