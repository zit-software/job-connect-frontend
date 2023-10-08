import skillService, { Skill } from '@/services/skill.service';
import { Paginationable } from '@/types/paginationable';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
	Button,
	Checkbox,
	CheckboxGroup,
	Chip,
	Spinner,
} from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import SearchSkillModal from './SearchSkillModal';
import { cachedSkills } from './cached-skills';

export interface SkillFilterProps {
	onChange?: (skills: Skill[]) => void;
}

export default function SkillFilter({ onChange }: SkillFilterProps) {
	const [showSkillFilterModal, setShowSkillFilterModal] = useState(false);
	const [skillList, setSkillList] = useState<Paginationable<Skill>>();
	const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);

	const [selectedSkillsParent] = useAutoAnimate();
	const [sortedSkillListParent] = useAutoAnimate();

	useEffect(() => {
		(async () => {
			const res = await skillService.getAllSkills();

			setSkillList(res);

			for (const skill of res.content) {
				cachedSkills.set(skill.id.toString(), skill);
			}
		})();
	}, []);

	const handleShowSkillFilterModal = () => {
		setShowSkillFilterModal(true);
	};

	const handleCloseSkillFilterModal = () => {
		setShowSkillFilterModal(false);
	};

	const removeSkill = (skillId: string) => {
		setSelectedSkillIds((prev) =>
			prev.filter((id) => id !== skillId.toString()),
		);
	};

	const handleSelectedSkillIdsChange = (skills: Skill[]) => {
		setSelectedSkillIds(skills.map((skill) => skill.id.toString()));
		for (const skill of skills) {
			cachedSkills.set(skill.id.toString(), skill);
		}
		handleCloseSkillFilterModal();
	};

	const selectedSkills = useMemo(
		() =>
			selectedSkillIds.map((id) => {
				return cachedSkills.get(id)!;
			}),
		[selectedSkillIds],
	);

	const sortedSkillList = useMemo(() => {
		return (
			skillList?.content.sort((a, b) => {
				return (
					selectedSkillIds.indexOf(b.id.toString()) -
					selectedSkillIds.indexOf(a.id.toString())
				);
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
						className='mb-2'
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
				<div
					className='flex flex-col gap-2'
					ref={sortedSkillListParent}
				>
					{sortedSkillList.length ? (
						sortedSkillList.map(({ id, name }) => (
							<Checkbox key={id} value={id.toString()}>
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
				className='mt-2'
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
