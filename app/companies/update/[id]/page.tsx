/* eslint-disable @next/next/no-img-element */
'use client';

import SelectFileModal from '@/components/select-file-modal';
import { updateCompanyDTO } from '@/models/Company';
import companyService from '@/services/company.service';
import fileService from '@/services/file.service';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Divider,
	Input,
	Progress,
	Radio,
	RadioGroup,
	Textarea,
	useDisclosure,
} from '@nextui-org/react';
import { Formik } from 'formik';
import { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import * as yup from 'yup';

const LocationPicker = dynamic(() => import('@/components/company/LocationPicker'), { ssr: false });

const validationSchema = yup.object().shape({
	name: yup.string().required('Tên công ty không được để trống'),
	description: yup.string().required('Mô tả công ty không được để trống'),
	address: yup.string().required('Địa chỉ công ty không được để trống'),
	url: yup.string().required('Website công ty không được để trống'),
	companySize: yup
		.string()
		.oneOf(
			['TWENTY', 'FIFTY', 'ONE_HUNDRED', 'TWO_HUNDRED', 'FIVE_HUNDRED', 'ONE_THOUSAND'],
			'Quy mô công ty không hợp lệ',
		),
});

export default function CreateCompanyPage() {
	const [parent] = useAutoAnimate();
	const [isSaving, setIsSaving] = useState(false);

	const params = useParams() as unknown as { id: number };

	const { data: company, isLoading } = useQuery(['company', { id: params.id }], () =>
		companyService.getCompanyById(params.id),
	);

	const { isOpen: isOpenSelectBannerModal, onOpenChange: onOpenSelectBannerModalChange } = useDisclosure();
	const { isOpen: isOpenSelectImageModal, onOpenChange: onOpenSelectImageModalChange } = useDisclosure();

	const handleSubmit = async (values: updateCompanyDTO) => {
		try {
			setIsSaving(true);
			await companyService.updateCompany(params.id, values);
			toast.success('Cập nhật công ty thành công');
		} catch (error: any) {
			toast.error(error);
		} finally {
			setIsSaving(false);
		}
	};

	if (isLoading) return <Progress size='sm' isIndeterminate aria-label='Loading...' className='w-full' />;

	if (!company) return <div>Không tìm thấy công ty</div>;

	return (
		<div className='w-[1280px] max-w-[95%] mx-auto'>
			<Formik
				initialValues={company as updateCompanyDTO}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
				enableReinitialize
			>
				{({ values, handleChange, errors, setFieldValue, handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<div className='sticky top-16 z-[100] py-5'>
							<div className='w-full bg-background border p-2 rounded-2xl flex gap-2 justify-end items-center font-bold'>
								<h2 className='flex-1 px-2 text-2xl'>{values.name}</h2>

								<Button
									color='primary'
									startContent={<i className='bx bx-save'></i>}
									size='lg'
									type='submit'
									isLoading={isSaving}
								>
									Lưu
								</Button>
							</div>
						</div>

						<div>
							<div
								className='w-full bg-cover bg-center bg-no-repeat bg-gray-200 rounded-2xl border relative'
								style={{
									aspectRatio: 2.2,
									backgroundImage: `url(${fileService.getFileUrl(values.banner)})`,
								}}
							>
								<div
									className='absolute w-64 aspect-square bottom-4 left-4 bg-gray-200 rounded-full border-4 border-white cursor-pointer bg-no-repeat bg-cover bg-center'
									style={{
										backgroundImage: `url(${fileService.getFileUrl(values.image)})`,
									}}
									onClick={onOpenSelectImageModalChange}
								></div>

								<Button
									isIconOnly
									className='absolute right-2 bottom-2'
									size='lg'
									onClick={onOpenSelectBannerModalChange}
								>
									<i className='bx bx-camera'></i>
								</Button>
							</div>
						</div>

						<div className='mt-10 my-10'>
							<div className='grid grid-cols-12 gap-5'>
								<div className='col-span-8'>
									<Card className='w-full p-5 shadow-none'>
										<CardHeader>
											<h3 className='font-bold text-2xl'>Thông Tin Cơ Bản</h3>
										</CardHeader>
										<Divider />
										<CardBody>
											<div className='grid grid-cols-12 gap-5' ref={parent}>
												<div className='col-span-12 md:col-span-6'>
													<Input
														labelPlacement='outside'
														value={values.name}
														isInvalid={!!errors.name}
														errorMessage={errors.name}
														name='name'
														label='Tên Công Ty'
														placeholder='VD: ZIT Software'
														onChange={handleChange}
													></Input>
												</div>
												<div className='col-span-12 md:col-span-6'>
													<Input
														labelPlacement='outside'
														onChange={handleChange}
														value={values.url}
														isInvalid={!!errors.url}
														errorMessage={errors.url}
														name='url'
														label='URL'
														placeholder='VD: http://zit-software.com'
													></Input>
												</div>
												<div className='col-span-12'>
													<RadioGroup
														orientation='horizontal'
														label='Quy mô công ty (Nhân Viên)'
														value={values.companySize}
														onValueChange={(value) => {
															setFieldValue('companySize', value);
														}}
														isInvalid={!!errors.companySize}
														errorMessage={errors.companySize}
													>
														<Radio value='TWENTY'>10-20</Radio>
														<Radio value='FIFTY'>20-50</Radio>
														<Radio value='ONE_HUNDRED'>50-100</Radio>
														<Radio value='TWO_HUNDRED'>100-200</Radio>
														<Radio value='FIVE_HUNDRED'>200-500</Radio>
														<Radio value='ONE_THOUSAND'>500-1000</Radio>
													</RadioGroup>
												</div>
												<div className='col-span-12'>
													<Textarea
														label='Mô tả công ty'
														labelPlacement='outside'
														placeholder='VD: ZIT Software là công ty phần mềm...'
														isInvalid={!!errors.description}
														errorMessage={errors.description}
														name='description'
														value={values.description}
														onChange={handleChange}
													/>
												</div>
												<div className='col-span-12'>
													<Input
														labelPlacement='outside'
														onChange={handleChange}
														value={values.address}
														isInvalid={!!errors.address}
														errorMessage={errors.address}
														name='address'
														label='Địa chỉ công ty'
														placeholder='VD: B3-10, Đường số 3...'
													></Input>
												</div>
												<div className='col-span-12'>
													<LocationPicker
														position={JSON.parse(values.mapPosition)}
														setPosition={(position: LatLngExpression) => {
															setFieldValue('mapPosition', JSON.stringify(position));
														}}
														draggable
													/>
												</div>
											</div>
										</CardBody>
									</Card>

									<SelectFileModal
										isOpen={isOpenSelectBannerModal}
										onClose={onOpenSelectBannerModalChange}
										onSelected={(file) => {
											setFieldValue('banner', file.id);
											onOpenSelectBannerModalChange();
										}}
									/>

									<SelectFileModal
										isOpen={isOpenSelectImageModal}
										onClose={onOpenSelectImageModalChange}
										onSelected={(file) => {
											setFieldValue('image', file.id);
											onOpenSelectImageModalChange();
										}}
									/>
								</div>

								<div className='col-span-4'>
									<Card className='w-full p-5 shadow-none'>
										<CardHeader>
											<h3 className='font-bold text-2xl'>Các Nhân Viên</h3>
										</CardHeader>
										<Divider />
										<CardBody></CardBody>
									</Card>
								</div>
							</div>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
}
