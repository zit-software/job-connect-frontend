import workTypeService from '@/services/workType.service';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Checkbox, CheckboxGroup, Chip, Spinner } from '@nextui-org/react';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function WorkTypeFiltter() {
	const { data: workTypes, isLoading: isLoadingWorkTypes } = useQuery('workTypes', () =>
		workTypeService.getWorkTypes(),
	);

	const [selectedWorkTypesIds, setSelectedWorkTypesIds] = useState<string[]>([]);
	const [selectedWorkTypesParent] = useAutoAnimate();

	const selectedWorkTypes =
		workTypes?.filter((workType) => selectedWorkTypesIds.includes(workType.id.toString())) || [];

	const removeWorkType = (id: number) => {
		setSelectedWorkTypesIds(selectedWorkTypesIds.filter((_id) => id.toString() !== _id));
	};

	if (isLoadingWorkTypes || !workTypes) return <Spinner />;

	return (
		<>
			<div className='flex flex-wrap gap-1' ref={selectedWorkTypesParent}>
				{selectedWorkTypes.map((workType) => (
					<Chip key={workType.id} variant='dot' color='primary' onClose={() => removeWorkType(workType.id)}>
						{workType.name}
					</Chip>
				))}
			</div>

			<CheckboxGroup
				label='Hình thức'
				value={selectedWorkTypesIds}
				onChange={(value) => setSelectedWorkTypesIds(value as string[])}
			>
				{workTypes.map((workType) => (
					<Checkbox value={workType.id.toString()} key={workType.id}>
						{workType.name}
					</Checkbox>
				))}
			</CheckboxGroup>
		</>
	);
}
