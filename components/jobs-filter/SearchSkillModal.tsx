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
import emptyLottie from '@/assets/lotties/empty.json';

export type SearchSkillModalProps = {
	isOpen: boolean;
	onFinish?: (skills: Skill[]) => void;
	onClose: () => void;
};

interface SkillListProps {
	onSubmit?: (skills: Skill[]) => void;
}

const cachedSkills: Skill[] = [];

function SkillList({ onSubmit }: SkillListProps) {
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
				const res = await skillService.searchSkills({
					name: debouncedSearchText,
				});

				setSkillList(res);

				cachedSkills.push(...res.content);
			} catch (error: any) {
				toast.error(error.message);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [debouncedSearchText]);

	const selectedSkills = useMemo<Skill[]>(() => {
		return selectedSkillIds.map(
			(skillId) =>
				cachedSkills.find((skill) => skill.id === parseInt(skillId))!,
		);
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

	const removeSkill = (id: number) => {
		setSelectedSkillIds((prev) => prev.filter((sk) => parseInt(sk) !== id));
	};

	return (
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
					value={searchText}
					onChange={(event) => setSearchText(event.target.value)}
					endContent={isLoading && <Spinner />}
				/>

				<h3 className='text-default-600'>Kỹ năng đã chọn</h3>

				<div ref={selectedSkillParent} className='flex gap-1 flex-wrap'>
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
						<span className='text-default-600 text-center text-sm w-full'>
							Bạn chưa chọn kỹ năng nào
						</span>
					)}
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
	onFinish,
	...props
}: SearchSkillModalProps) {
	return (
		<Modal scrollBehavior='inside' placement='top' {...props}>
			<ModalContent>
				{() => <SkillList key='content' onSubmit={onFinish} />}
			</ModalContent>
		</Modal>
	);
}
