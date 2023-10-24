import emptyLottie from '@/assets/lotties/empty.json';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import useDebounce from '@/hooks/useDebounce';
import skillService, { Skill } from '@/services/skill.service';
import { RootState } from '@/store';
import { addSkills } from '@/store/skillsSlice';
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
import { useSelector } from 'react-redux';

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

function SkillList({ selectedSkills: _selectedSkills = [], onSubmit }: SkillListProps) {
	const [skillList, setSkillList] = useState<Paginationable<Skill>>();
	const [searchText, setSearchText] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);

	const debouncedSearchText = useDebounce(searchText);

	const [skillListParent] = useAutoAnimate();
	const [selectedSkillParent] = useAutoAnimate();

	const dispatch = useAppDispatch();
	const cachedSkills = useSelector((state: RootState) => state.skills.cachedSkills);

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const res = await skillService.getAllSkills({
					name: debouncedSearchText as string,
					pageSize: 100,
				});

				setSkillList(res);

				dispatch(addSkills(res.content));
			} catch (error: any) {
				toast.error(error.message);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [debouncedSearchText, dispatch]);

	const selectedSkills = useMemo<Skill[]>(() => {
		return selectedSkillIds.map((skillId) => cachedSkills[skillId]);
	}, [cachedSkills, selectedSkillIds]);

	const renderedSkillList = useMemo<Skill[]>(() => {
		return (
			skillList?.content.sort((a, b) => {
				return selectedSkillIds.indexOf(b.id.toString()) - selectedSkillIds.indexOf(a.id.toString());
			}) || []
		);
	}, [selectedSkillIds, skillList]);

	useEffect(() => {
		setSelectedSkillIds(_selectedSkills.map((skill) => skill.id.toString()));
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
						startContent={<i className='bx bx-search-alt-2 text-2xl text-gray-500'></i>}
						className='mb-2'
						variant='underlined'
						value={searchText}
						onChange={(event) => setSearchText(event.target.value)}
						endContent={isLoading && <Spinner />}
					/>

					<h3 className='text-default-600'>Kỹ năng đã chọn</h3>

					<div ref={selectedSkillParent} className='flex gap-1 flex-wrap'>
						{selectedSkills.map((skill) => (
							<Chip key={skill.id} color='primary' variant='dot' onClose={() => removeSkill(skill.id)}>
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
					<div ref={skillListParent} className='gap-2 min-h-[370px]'>
						{renderedSkillList.map((skill) => (
							<Checkbox className='block w-full' key={skill.id} value={skill.id.toString()}>
								{skill.name}
							</Checkbox>
						))}

						{renderedSkillList.length === 0 && <Lottie animationData={emptyLottie} />}
					</div>
				</CheckboxGroup>
			</ModalBody>

			<ModalFooter>
				<Button color='primary' variant='shadow' type='submit' onClick={() => onSubmit?.(selectedSkills)}>
					Xác nhận
				</Button>
			</ModalFooter>
		</>
	);
}

export default function SearchSkillModal({ selectedSkills = [], onFinish, ...props }: SearchSkillModalProps) {
	return (
		<Modal scrollBehavior='inside' placement='top' {...props}>
			<ModalContent>
				{() => <SkillList key='content' selectedSkills={selectedSkills} onSubmit={onFinish} />}
			</ModalContent>
		</Modal>
	);
}
