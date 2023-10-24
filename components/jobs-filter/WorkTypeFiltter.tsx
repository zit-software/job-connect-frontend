import { WorkType } from '@/models/WorkType';
import workTypeService from '@/services/workType.service';
import { Radio, RadioGroup, Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export interface WorkTypeFiltterProps {
	selectedWorkTypeId?: number;
	onChange?: (workType?: WorkType) => void;
}

export default function WorkTypeFiltter({ selectedWorkTypeId: _selectedWorkTypeId, onChange }: WorkTypeFiltterProps) {
	const { data: workTypes, isLoading: isLoadingWorkTypes } = useQuery('workTypes', () =>
		workTypeService.getWorkTypes(),
	);
	const [selectedWorkTypeId, setSelectedWorkTypeId] = useState<string>(_selectedWorkTypeId?.toString() || '');

	const selectedWorkType = workTypes?.find((e) => e.id.toString() === selectedWorkTypeId);

	useEffect(() => {
		onChange?.(selectedWorkType);
	}, [onChange, selectedWorkType]);

	if (isLoadingWorkTypes || !workTypes) return <Spinner />;

	return (
		<>
			<RadioGroup
				label='Hình thức'
				value={selectedWorkTypeId}
				onChange={(event) => setSelectedWorkTypeId(event.target.value)}
			>
				{workTypes.map((workType) => (
					<Radio value={workType.id.toString()} key={workType.id}>
						{workType.name}
					</Radio>
				))}

				<Radio value='' key=''>
					Tất cả
				</Radio>
			</RadioGroup>
		</>
	);
}
