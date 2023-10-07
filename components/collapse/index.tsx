import { motion, MotionProps } from 'framer-motion';
import { HTMLAttributes } from 'react';

export type CollapseProps = {
	open?: boolean;
	children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement> &
	MotionProps;

export default function Collapse({ open, children, ...props }: CollapseProps) {
	return (
		open && (
			<motion.div
				{...props}
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				exit={{
					opacity: 0,
				}}
			>
				{children}
			</motion.div>
		)
	);
}
