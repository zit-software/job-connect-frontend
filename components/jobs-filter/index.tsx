'use client';

import Collapse from '@/components/collapse';
import { Button, Checkbox, CheckboxGroup, Input } from '@nextui-org/react';
import { useState } from 'react';
import SkillFilter from './SkillFilter';
import { Skill } from '@/services/skill.service';

export default function JobsFilter() {
	const [showFilter, setShowFilter] = useState(false);
	const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
	const [searchText, setSearchText] = useState('');

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
					value={searchText}
					onChange={(event) => setSearchText(event.target.value)}
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
							<SkillFilter onChange={setSelectedSkills} />
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
		</>
	);
}
