'use client';

import { Button, Card, CardBody } from '@nextui-org/react';
export default function Action() {
	return (
		<Card>
			<CardBody>
				<Button className='my-3'>
					<i className='bx bx-plus mr-2'></i>Ứng tuyển
				</Button>
				<Button className='my-3'>
					<i className='bx bx-briefcase'></i>Xem công ty
				</Button>
				<Button className='my-3'>
					<i className='bx bx-file'></i>Tạo cv ngay
				</Button>
			</CardBody>
		</Card>
	);
}
