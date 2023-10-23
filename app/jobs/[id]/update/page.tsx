'use client';

import ErrorMessage from '@/components/ErrorMessage';
import PageLoading from '@/components/PageLoader';
import SearchSkillModal from '@/components/jobs-filter/SearchSkillModal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { WorkType } from '@/models/WorkType';
import { queryClient } from '@/providers/QueryClientProvider';
import fileService from '@/services/file.service';
import jobService, { UpdateJobDto } from '@/services/job.service';
import { Skill } from '@/services/skill.service';
import workTypeService from '@/services/workType.service';
import { RootState } from '@/store';
import { addSkills } from '@/store/skillsSlice';
import { Avatar, Button, Card, CardBody, Chip, Input, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { Formik } from 'formik';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then((e) => e.CKEditor));

const validationSchema = yup.object().shape({
	title: yup.string().required('Tên công việc không được để trống'),
	minExp: yup.number().required('Kinh nghiệm tối thiểu không được để trống'),
	minSalary: yup.number().required('Lương tối thiểu không được để trống'),
	maxSalary: yup.number().required('Lương tối đa không được để trống'),
	workTypeId: yup.number().required('Loại công việc không được để trống'),
	description: yup.string().required('Mô tả công việc không được để trống'),
	skillIds: yup.array().required('Kỹ năng không được để trống'),
});

export default function UpdateJobPage({ params }: { params: { id: number } }) {
	const dispatch = useAppDispatch();
	const cachedSkills = useSelector((state: RootState) => state.skills.cachedSkills);

	const { data: workTypes } = useQuery(['workTypes'], () => workTypeService.getWorkTypes());
	const {
		data: job,
		isLoading,
		error,
	} = useQuery(['job', { id: params.id }], () => jobService.getJobById(params.id), {
		onSuccess(data) {
			dispatch(addSkills(data.skills));
		},
	});

	const [isSaving, setIsSaving] = useState(false);
	const { isOpen: isOpenSelectSkillModal, onOpenChange: onOpenSelecSkillModalChange } = useDisclosure();

	const handleSubmit = async (values: UpdateJobDto) => {
		try {
			setIsSaving(true);

			const res = await jobService.updateById(params.id, values);

			queryClient.setQueryData(['job', { id: params.id }], res);
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsSaving(false);
		}
	};

	if (isLoading) return <PageLoading />;

	if (!job) return <ErrorMessage message={(error as any).message} />;

	return (
		<div className='container max-w-[95%] w-[1280px] mx-auto my-5'>
			<Formik
				validationSchema={validationSchema}
				initialValues={
					{
						...job,
						skillIds: job.skills.map((e) => e.id),
						workTypeId: job.workType.id,
					} as unknown as UpdateJobDto
				}
				enableReinitialize
				onSubmit={handleSubmit}
			>
				{({ handleSubmit, values, errors, setFieldValue, handleChange }) => (
					<>
						<form onSubmit={handleSubmit}>
							<div className='flex items-center justify-between w-full'>
								<div className='py-2 my-2 flex items-center gap-2'>
									<Link href={`/companies/${job.company.id}/jobs`}>
										<Button variant='light' isIconOnly>
											<i className='bx bx-left-arrow-alt'></i>
										</Button>
									</Link>
									<Avatar src={fileService.getFileUrl(job.company.image)} size='sm' />
									<h3 className='font-bold'>{job.company.name}</h3>
									<span className='text-default-500 font-semibold text-sm'>/jobs/</span>
								</div>

								<h2 className='font-bold text-2xl flex-1 pl-2'>{values.title}</h2>

								<Button color='primary' type='submit' isLoading={isSaving}>
									Lưu
								</Button>
							</div>

							<Card className='my-2 shadow-none border'>
								<CardBody>
									<div className='grid grid-cols-12'>
										<div className='col-span-12'>
											<h3 className='text-xl mb-2 font-bold'>Thông tin chung</h3>

											<div>
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
													{workTypes && (
														<Select
															placeholder='Chọn loại hình làm việc'
															label='Loại hình làm việc'
															labelPlacement='outside'
															name='workTypeId'
															onChange={handleChange}
															selectedKeys={[values.workTypeId?.toString()]}
															isInvalid={!!errors.workTypeId}
															errorMessage={errors.workTypeId}
														>
															{workTypes.map((workType: WorkType) => (
																<SelectItem key={workType.id} value={workType.id}>
																	{workType.name}
																</SelectItem>
															))}
														</Select>
													)}
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
											</div>
										</div>
									</div>
								</CardBody>
							</Card>

							<div className='grid grid-cols-12 gap-5'>
								<div className='col-span-8 bg-background p-4 rounded-xl border'>
									<h3 className='text-xl mb-2 font-bold'>Mô tả công việc</h3>

									<CKEditor
										editor={require('@ckeditor/ckeditor5-build-classic')}
										data={values.description}
										onChange={(_, editor: any) => {
											const data = editor.getData();

											setFieldValue('description', data);
										}}
									/>
								</div>
								<div className='col-span-4 bg-background p-4 rounded-xl border'>
									<div className='flex items-center justify-between'>
										<h3 className='text-xl mb-2 font-bold'>Kỹ năng yêu cầu</h3>

										<Button size='sm' color='primary' onClick={onOpenSelecSkillModalChange}>
											Thêm
										</Button>
									</div>

									<div className='flex flex-wrap gap-1'>
										{values.skillIds.map((id) => (
											<Chip key={id}>{cachedSkills[id].name}</Chip>
										))}
									</div>
								</div>
							</div>
						</form>

						<SearchSkillModal
							isOpen={isOpenSelectSkillModal}
							onClose={onOpenSelecSkillModalChange}
							selectedSkills={values.skillIds.map(
								(id) => cachedSkills[id as unknown as keyof typeof cachedSkills] as unknown as Skill,
							)}
							onFinish={(skills) => {
								setFieldValue(
									'skillIds',
									skills.map((e) => e.id),
								);
								onOpenSelecSkillModalChange();
							}}
						/>
					</>
				)}
			</Formik>
		</div>
	);
}
