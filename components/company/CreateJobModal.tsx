import { AddJobDTO, AddJobForm } from '@/models/Job';
import { WorkType } from '@/models/WorkType';
import jobService from '@/services/job.service';
import workTypeService from '@/services/workType.service';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem } from '@nextui-org/react';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import * as yup from 'yup';
interface CreateJobModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	companyId: number;
	onClose: () => void;
}
export default function CreateJobModal({ isOpen, onOpenChange, companyId, onClose }: CreateJobModalProps) {
	const validationSchema = yup.object().shape({
		title: yup.string().required('Tên công việc không được để trống'),
		minExp: yup.number().required('Kinh nghiệm tối thiểu không được để trống'),
		minSalary: yup.number().required('Lương tối thiểu không được để trống'),
		maxSalary: yup.number().required('Lương tối đa không được để trống'),
		workTypeId: yup.number().required('Loại công việc không được để trống'),
	});
	const router = useRouter();
	const { data: workTypes } = useQuery('workTypes', () => workTypeService.getWorkTypes(), { initialData: [] });
	const handleSubmit = async (values: AddJobForm) => {
		try {
			const job = await jobService.createJob({
				...values,
				companyId,
				workTypeId: parseInt(values.workTypeId + ''),
			} as AddJobDTO);
			toast.success('Tạo công việc thành công');
			onClose();
			router.push(`companies/${companyId}/jobs/update/${job.id}`);
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<Modal className='z-10' isOpen={isOpen} onOpenChange={onOpenChange} size='xl'>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>Tạo công việc mới</ModalHeader>
						<ModalBody>
							<Formik
								validationSchema={validationSchema}
								initialValues={
									{
										title: undefined,
										minExp: undefined,
										minSalary: undefined,
										maxSalary: undefined,
										workTypeId: undefined,
										address: undefined,
										companyId,
									} as AddJobForm
								}
								onSubmit={handleSubmit}
							>
								{({ handleSubmit, values, errors, setFieldValue, handleChange }) => (
									<form onSubmit={handleSubmit}>
										<Input
											name='title'
											value={values.title}
											onChange={handleChange}
											isInvalid={!!errors.title}
											errorMessage={errors.title}
											label='Tên công việc'
											labelPlacement='outside'
											placeholder='VD: Full-stack developer'
										/>
										<Input
											name='address'
											value={values.address}
											onChange={handleChange}
											isInvalid={!!errors.address}
											errorMessage={errors.address}
											label='Địa chỉ'
											labelPlacement='outside'
											placeholder='VD: B3-10, Đường số 3, ...'
											className='my-3'
										/>
										<div className='flex items-center gap-5'>
											<Input
												className='my-3'
												type='number'
												label='Số năm kinh nghiệm tối thiểu'
												placeholder='0.00'
												labelPlacement='outside'
												endContent={
													<div className='pointer-events-none flex items-center'>
														<span className='text-default-400 text-small'>năm</span>
													</div>
												}
												isInvalid={!!errors.minExp}
												errorMessage={errors.minExp}
												value={values.minExp + ''}
												onChange={handleChange}
												name='minExp'
											/>
											<Select
												placeholder='Chọn loại hình làm việc'
												label='Loại hình làm việc'
												labelPlacement='outside'
												name='workTypeId'
												onChange={handleChange}
												selectedKeys={[values.workTypeId || 0]}
												isInvalid={!!errors.workTypeId}
												errorMessage={errors.workTypeId}
											>
												{(workTypes || []).map((workType: WorkType) => (
													<SelectItem key={workType.id} value={workType.id}>
														{workType.name}
													</SelectItem>
												))}
											</Select>
										</div>
										<div className='flex items-center gap-5'>
											<Input
												className='my-3'
												type='number'
												label='Mức Lương tối thiểu'
												placeholder='0.00'
												labelPlacement='outside'
												endContent={
													<div className='pointer-events-none flex items-center'>
														<span className='text-default-400 text-small'>VND</span>
													</div>
												}
												onChange={handleChange}
												isInvalid={!!errors.minSalary}
												errorMessage={errors.minSalary}
												value={values.minSalary + ''}
												name='minSalary'
											/>
											<Input
												className='my-3'
												type='number'
												label='Mức Lương tối đa'
												placeholder='0.00'
												labelPlacement='outside'
												endContent={
													<div className='pointer-events-none flex items-center'>
														<span className='text-default-400 text-small'>VND</span>
													</div>
												}
												onChange={handleChange}
												isInvalid={!!errors.maxSalary}
												errorMessage={errors.maxSalary}
												value={values.maxSalary + ''}
												name='maxSalary'
											/>
										</div>
										<div className='flex justify-end mt-5'>
											<Button color='danger' variant='light' onPress={onClose}>
												Hủy
											</Button>
											<Button color='primary' type='submit'>
												Lưu
											</Button>
										</div>
									</form>
								)}
							</Formik>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
