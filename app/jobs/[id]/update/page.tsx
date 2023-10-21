'use client';

import PageLoading from '@/components/PageLoader';
import JDEditor from '@/components/companies/jdEditor';
import SkillEditor from '@/components/companies/skillEditor';
import { AddJobForm } from '@/models/Job';
import { WorkType } from '@/models/WorkType';
import jobService from '@/services/job.service';
import workTypeService from '@/services/workType.service';
import { Button, Card, CardBody, CardHeader, Divider, Input, Select, SelectItem } from '@nextui-org/react';
import { Formik } from 'formik';
import { useQuery } from 'react-query';
import * as yup from 'yup';

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
	const { data: job, isLoading, error } = useQuery(['jobs', params.id], () => jobService.getJobById(params.id));
	const { data: workTypes } = useQuery('workTypes', () => workTypeService.getWorkTypes(), { initialData: [] });
	const handleSubmit = (values: any) => {};
	if (isLoading) return <PageLoading />;
	return (
		<div className='container max-w-[1280px] mx-auto my-5'>
			<Card className='p-5'>
				<CardHeader className='my-5'>
					<div className='flex items-center justify-between w-full'>
						<h1 className='font-bold text-2xl'>{job?.title}</h1>
						<Button className='mx-5' color='primary'>
							Lưu
						</Button>
					</div>
				</CardHeader>
				<Divider />
			</Card>
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
						companyId: params.id,
					} as AddJobForm
				}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit, values, errors, setFieldValue, handleChange }) => (
					<form onSubmit={handleSubmit}>
						<Card className='my-10'>
							<CardBody>
								<div className='grid grid-cols-12'>
									<div className='col-span-12'>
										<h1 className='text-xl italic text-center'>Thông tin chung</h1>
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
										</div>
									</div>
									<div className='col-span-8'></div>
									<div className='col-span-4'></div>
								</div>
							</CardBody>
						</Card>
						<div className='grid grid-cols-12 gap-5'>
							<div className='col-span-8'>
								<JDEditor />
							</div>
							<div className='col-span-4'>
								<SkillEditor />
							</div>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
}
