import emptyLottie from '@/assets/lotties/empty.json';
import useDebounce from '@/hooks/useDebounce';
import skillService, { Skill } from '@/services/skill.service';
import { Paginationable } from '@/types/paginationable';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
	Button,
	Checkbox,
	CheckboxGroup,
	Chip,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Spinner,
} from '@nextui-org/react';
import Lottie from 'lottie-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { cachedSkills } from './cached-skills';

export type SearchSkillModalProps = {
	isOpen: boolean;
	selectedSkills?: Skill[];
	onFinish?: (skills: Skill[]) => void;
	onClose: () => void;
};

interface SkillListProps {
	selectedSkills?: Skill[];
	onSubmit?: (skills: Skill[]) => void;
}

function SkillList({
	selectedSkills: _selectedSkills = [],
	onSubmit,
}: SkillListProps) {
	const [skillList, setSkillList] = useState<Paginationable<Skill>>();
	const [searchText, setSearchText] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);

	const debouncedSearchText = useDebounce(searchText);

	const [skillListParent] = useAutoAnimate();
	const [selectedSkillParent] = useAutoAnimate();

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const res = await skillService.getAllSkills({
					name: debouncedSearchText,
				});

				setSkillList(res);

				for (const skill of res.content) {
					cachedSkills.set(skill.id.toString(), skill);
				}
			} catch (error: any) {
				toast.error(error.message);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [debouncedSearchText]);

	const selectedSkills = useMemo<Skill[]>(() => {
		return selectedSkillIds.map((skillId) => cachedSkills.get(skillId)!);
	}, [selectedSkillIds]);

	const renderedSkillList = useMemo<Skill[]>(() => {
		return (
			skillList?.content.sort((a, b) => {
				return (
					selectedSkillIds.indexOf(b.id.toString()) -
					selectedSkillIds.indexOf(a.id.toString())
				);
			}) || []
		);
	}, [selectedSkillIds, skillList]);

	useEffect(() => {
		setSelectedSkillIds(
			_selectedSkills.map((skill) => skill.id.toString()),
		);
	}, [_selectedSkills]);

	const removeSkill = (id: number) => {
		setSelectedSkillIds((prev) => prev.filter((sk) => parseInt(sk) !== id));
	};

	return (
		<>
			<ModalHeader>Kỹ năng</ModalHeader>

			<ModalBody>
				<div className='sticky top-0 z-10 bg-background'>
					<Input
						placeholder='Nhập tên kỹ năng để tìm kiếm'
						startContent={
							<i className='bx bx-search-alt-2 text-2xl text-gray-500'></i>
						}
						className='mb-2'
						variant='underlined'
						value={searchText}
						onChange={(event) => setSearchText(event.target.value)}
						endContent={isLoading && <Spinner />}
					/>

					<h3 className='text-default-600'>Kỹ năng đã chọn</h3>

					<div
						ref={selectedSkillParent}
						className='flex gap-1 flex-wrap'
					>
						{selectedSkills.map((skill) => (
							<Chip
								key={skill.id}
								color='primary'
								variant='dot'
								onClose={() => removeSkill(skill.id)}
							>
								{skill.name}
							</Chip>
						))}

						{selectedSkillIds.length === 0 && (
							<span className='text-default-600 text-center text-sm w-full italic'>
								Bạn chưa chọn kỹ năng nào
							</span>
						)}
					</div>
				</div>

				<CheckboxGroup
					label='Kỹ năng'
					value={selectedSkillIds}
					onChange={(value) => setSelectedSkillIds(value as string[])}
				>
					<div
						ref={skillListParent}
						className='flex flex-col gap-2 min-h-[370px]'
					>
						{renderedSkillList.map((skill) => (
							<Checkbox
								key={skill.id}
								value={skill.id.toString()}
							>
								{skill.name}
							</Checkbox>
						))}

						{renderedSkillList.length === 0 && (
							<Lottie animationData={emptyLottie} />
						)}
					</div>
				</CheckboxGroup>
			</ModalBody>

			<ModalFooter>
				<Button
					color='primary'
					variant='shadow'
					onClick={() => onSubmit?.(selectedSkills)}
				>
					Xác nhận
				</Button>
			</ModalFooter>
		</>
	);
}

export default function SearchSkillModal({
	selectedSkills = [],
	onFinish,
	...props
}: SearchSkillModalProps) {
	return (
		<Modal scrollBehavior='inside' placement='top' {...props}>
			<ModalContent>
				{() => (
					<SkillList
						key='content'
						selectedSkills={selectedSkills}
						onSubmit={onFinish}
					/>
				)}
			</ModalContent>
		</Modal>
	);
}
