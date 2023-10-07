'use client';

import Collapse from '@/components/collapse';
import { title } from '@/components/primitives';
import {
	Button,
	Checkbox,
	CheckboxGroup,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import clsx from 'clsx';
import { useState } from 'react';

export default function JobsPage() {
	const [showFilter, setShowFilter] = useState(false);
	const [showSkillFilterModal, setShowSkillFilterModal] = useState(false);

	const handleShowSkillFilterModal = () => {
		setShowSkillFilterModal(true);
	};

	const handleCloseSkillFilterModal = () => {
		setShowSkillFilterModal(false);
	};

	return (
		<div className='container mx-auto max-w-[1280px] rounded-xl my-4 px-4'>
			<h2 className={clsx('block text-center my-8 text-4xl font-bold')}>
				Tìm kiếm việc làm tại{' '}
				<span className={title({ color: 'blue' })}>Job Connect</span>
			</h2>

			<div className='flex bg-background p-2 rounded-2xl gap-2 shadow-lg'>
				<Input
					placeholder='Lập trình viên Reactjs, Java...'
					variant='flat'
					size='lg'
					label='Tìm kiếm'
					className='flex-1'
					startContent={
						<i className='bx bx-search-alt-2 text-2xl text-gray-500'></i>
					}
				/>

				<Button
					isIconOnly
					className='w-16 h-16'
					variant={showFilter ? 'shadow' : 'bordered'}
					color='primary'
					onClick={() => setShowFilter(!showFilter)}
				>
					<i className='bx bx-filter-alt text-2xl'></i>
				</Button>
			</div>

			<Collapse open={showFilter} className='mt-4'>
				<div className='bg-background p-4 rounded-xl shadow-lg border'>
					<div className='grid grid-cols-2 gap-1'>
						<div className='col-span-1'>
							<CheckboxGroup label='Kỹ năng'>
								<Checkbox value='reactjs'>Reactjs</Checkbox>
								<Checkbox value='angular'>Angular</Checkbox>
								<Checkbox value='vuejs'>Vuejs</Checkbox>
								<Checkbox value='nodejs'>Nodejs</Checkbox>
								<Checkbox value='nextjs'>Nextjs</Checkbox>
							</CheckboxGroup>

							<Button
								variant='flat'
								color='primary'
								size='sm'
								className='mt-2'
								endContent={
									<i className='bx bx-right-arrow-alt'></i>
								}
								onClick={handleShowSkillFilterModal}
							>
								Xem thêm
							</Button>
						</div>

						<div className='col-span-1'>
							<CheckboxGroup label='Hình thức'>
								<Checkbox value='remote'>Remote</Checkbox>
								<Checkbox value='on-site'>On-Site</Checkbox>
							</CheckboxGroup>
						</div>
					</div>
				</div>
			</Collapse>

			<div className='bg-background shadow-lg rounded-xl border p-2 mt-4'></div>

			<Modal
				isOpen={showSkillFilterModal}
				scrollBehavior='inside'
				placement='top'
				onClose={handleCloseSkillFilterModal}
			>
				<ModalContent>
					{() => (
						<>
							<ModalHeader>Kỹ năng</ModalHeader>

							<ModalBody>
								<Input
									placeholder='Nhập tên kỹ năng để tìm kiếm'
									startContent={
										<i className='bx bx-search-alt-2 text-2xl text-gray-500'></i>
									}
									className='sticky top-0 z-10'
									variant='underlined'
								/>

								<CheckboxGroup label='Kỹ năng'>
									<Checkbox value='reactjs'>Reactjs</Checkbox>
									<Checkbox value='angular'>Angular</Checkbox>
									<Checkbox value='vuejs'>Vuejs</Checkbox>
									<Checkbox value='nodejs'>Nodejs</Checkbox>
									<Checkbox value='nextjs'>Nextjs</Checkbox>
								</CheckboxGroup>
							</ModalBody>

							<ModalFooter />
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
