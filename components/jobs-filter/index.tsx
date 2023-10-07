'use client';

import Collapse from '@/components/collapse';
import skillService, { Skill } from '@/services/skill.service';
import { Paginationable } from '@/types/paginationable';
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
	Spinner,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import SearchSkillModal from './SearchSkillModal';

export default function JobsFilter() {
	const [showFilter, setShowFilter] = useState(false);
	const [showSkillFilterModal, setShowSkillFilterModal] = useState(false);
	const [skillList, setSkillList] = useState<Paginationable<Skill>>();

	useEffect(() => {
		(async () => {
			const res = await skillService.getAllSkills();

			setSkillList(res);
		})();
	}, []);

	const handleShowSkillFilterModal = () => {
		setShowSkillFilterModal(true);
	};

	const handleCloseSkillFilterModal = () => {
		setShowSkillFilterModal(false);
	};

	return (
		<>
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
								{skillList ? (
									skillList.content.map(({ id, name }) => (
										<Checkbox
											key={id}
											value={id.toString()}
										>
											{name}
										</Checkbox>
									))
								) : (
									<Spinner />
								)}
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

			<SearchSkillModal
				isOpen={showSkillFilterModal}
				onClose={handleCloseSkillFilterModal}
			/>
		</>
	);
}
