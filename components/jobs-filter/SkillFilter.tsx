import { useAppDispatch } from '@/hooks/useAppDispatch';
import skillService, { Skill } from '@/services/skill.service';
import { RootState } from '@/store';
import { addSkills } from '@/store/skillsSlice';
import { Paginationable } from '@/types/paginationable';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, Checkbox, CheckboxGroup, Chip, Spinner } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import SearchSkillModal from './SearchSkillModal';

export interface SkillFilterProps {
	selectedSkillIds?: number[];
	onChange?: (skills: Skill[]) => void;
}

export default function SkillFilter({ selectedSkillIds: _selectedSkillIds, onChange }: SkillFilterProps) {
	const [showSkillFilterModal, setShowSkillFilterModal] = useState(false);
	const [skillList, setSkillList] = useState<Paginationable<Skill>>();
	const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>(
		_selectedSkillIds?.map((e) => e.toString()) || [],
	);

	const [selectedSkillsParent] = useAutoAnimate();
	const [sortedSkillListParent] = useAutoAnimate();

	const cachedSkills = useSelector((state: RootState) => state.skills.cachedSkills);
	const dispatch = useAppDispatch();

	useEffect(() => {
		(async () => {
			const res = await skillService.getAllSkills();

			setSkillList(res);

			dispatch(addSkills(res.content));
		})();
	}, [dispatch]);

	const handleShowSkillFilterModal = () => {
		setShowSkillFilterModal(true);
	};

	const handleCloseSkillFilterModal = () => {
		setShowSkillFilterModal(false);
	};

	const removeSkill = (skillId: string) => {
		setSelectedSkillIds((prev) => prev.filter((id) => id !== skillId.toString()));
	};

	const handleSelectedSkillIdsChange = (skills: Skill[]) => {
		setSelectedSkillIds(skills.map((skill) => skill.id.toString()));
		dispatch(addSkills(skills));

		handleCloseSkillFilterModal();
	};

	const selectedSkills = useMemo(
		() => selectedSkillIds.map((id) => cachedSkills[id]),
		[cachedSkills, selectedSkillIds],
	);

	const sortedSkillList = useMemo(() => {
		return (
			skillList?.content.sort((a, b) => {
				return selectedSkillIds.indexOf(b.id.toString()) - selectedSkillIds.indexOf(a.id.toString());
			}) || []
		);
	}, [skillList, selectedSkillIds]);

	useEffect(() => {
		onChange?.(selectedSkills);
	}, [onChange, selectedSkills]);

	return (
		<>
			<div className='flex gap-1 flex-wrap' ref={selectedSkillsParent}>
				{selectedSkills.map((skill) => (
					<Chip
						key={skill.id}
						variant='dot'
						color='primary'
						className='mb-1'
						onClose={() => removeSkill(skill.id.toString())}
					>
						{skill.name}
					</Chip>
				))}
			</div>
			<CheckboxGroup
				label='Kỹ năng'
				value={selectedSkillIds}
				onChange={(value) => setSelectedSkillIds(value as string[])}
			>
				<div className='columns-2 gap-1' ref={sortedSkillListParent}>
					{sortedSkillList.length ? (
						sortedSkillList.map(({ id, name }) => (
							<Checkbox key={id} value={id.toString()} className='block'>
								{name}
							</Checkbox>
						))
					) : (
						<Spinner />
					)}
				</div>
			</CheckboxGroup>

			<Button
				variant='flat'
				color='primary'
				size='sm'
				className='my-1'
				endContent={<i className='bx bx-right-arrow-alt'></i>}
				onClick={handleShowSkillFilterModal}
			>
				Xem thêm
			</Button>

			<SearchSkillModal
				isOpen={showSkillFilterModal}
				selectedSkills={selectedSkills}
				onClose={handleCloseSkillFilterModal}
				onFinish={handleSelectedSkillIdsChange}
			/>
		</>
	);
}
