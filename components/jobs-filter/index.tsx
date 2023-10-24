'use client';

import Collapse from '@/components/collapse';
import useDebounce from '@/hooks/useDebounce';
import { WorkType } from '@/models/WorkType';
import { FindJobDto } from '@/services/job.service';
import { Skill } from '@/services/skill.service';
import { Button, Input, Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import SkillFilter from './SkillFilter';
import WorkTypeFiltter from './WorkTypeFiltter';

export interface JobsFilterProps {
	onFiltered?: (filterObject: FindJobDto) => void;
	isSearching?: boolean;
}

export default function JobsFilter({ isSearching, onFiltered }: JobsFilterProps) {
	const [showFilter, setShowFilter] = useState(false);
	const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
	const [searchText, setSearchText] = useState('');
	const [selectedWorkType, setSelectedWorkType] = useState<WorkType | null>();

	const debouncedSearchText = useDebounce<string>(searchText);
	const debouncedSelectedSkills = useDebounce<Skill[]>(selectedSkills);
	const debouncedSelectedWorkType = useDebounce<WorkType | null>(selectedWorkType);

	useEffect(() => {
		onFiltered?.({
			keyword: debouncedSearchText,
			skillId: debouncedSelectedSkills.map((e) => e.id),
			workTypeId: debouncedSelectedWorkType?.id,
		});
	}, [debouncedSearchText, debouncedSelectedSkills, debouncedSelectedWorkType?.id, onFiltered]);

	return (
		<>
			<div className='flex bg-background p-4 rounded-2xl gap-2 shadow-lg'>
				<Input
					placeholder='Lập trình viên Reactjs, Java...'
					variant='flat'
					size='lg'
					label='Tìm kiếm'
					className='flex-1'
					startContent={<i className='bx bx-search-alt-2 text-2xl text-gray-500'></i>}
					value={searchText}
					endContent={isSearching && <Spinner />}
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
						<div className='col-span-2 md:col-span-1'>
							<SkillFilter
								selectedSkillIds={selectedSkills.map((e) => e.id)}
								onChange={setSelectedSkills}
							/>
						</div>

						<div className='col-span-2 md:col-span-1'>
							<WorkTypeFiltter selectedWorkTypeId={selectedWorkType?.id} onChange={setSelectedWorkType} />
						</div>
					</div>
				</div>
			</Collapse>
		</>
	);
}
