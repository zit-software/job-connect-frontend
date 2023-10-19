'use client';

import UploadImageModal from '@/components/company/UploadImage';
import { Company, updateCompanyDTO } from '@/models/Company';
import companyService from '@/services/company.service';
import fileService from '@/services/file.service';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
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
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
const LocationPicker = dynamic(() => import('@/components/company/LocationPicker'), { ssr: false });

interface CreateCompanyProps {}

function CreateCompany({}: CreateCompanyProps) {
	const [loading, setLoading] = useState(false);

	const [company, setCompany] = useState<Company>();
	const params = useParams() as unknown as { id: number };
	const [parent] = useAutoAnimate();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [type, setType] = useState<string>('');
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
	const handleSubmit = async (values: updateCompanyDTO) => {
		await companyService.updateCompany(params.id, values);
		toast.success('Cập nhật công ty thành công');
	};

	useEffect(() => {
		async function getCompany() {
			setLoading(true);
			const companyData = (await companyService.getCompanyById(params.id)) as Company;
			setCompany(companyData);
			setLoading(false);
		}
		getCompany();
	}, [params.id]);
	useEffect(() => {
		if (type) {
			onOpen();
		}
	}, [onOpen, type]);
	if (loading) return <Progress size='sm' isIndeterminate aria-label='Loading...' className='w-full' />;

	return (
		<div className='container max-w-[1440px] mx-auto'>
			<div className=' shadow-lg max-w-[1440px] w-[90vw] sm:w-[100vw] h-[600px] bg-white mx-auto p-8 rounded-xl'>
				<div
					onClick={() => setType('banner')}
					className='relative f cursor-pointer max-w-[1440px] h-[400px] bg-white mx-auto my-auto'
				>
					{!company?.banner ? (
						<div className='w-full h-full object-cover border-dashed border-5 border-grey text-white rounded-2xl flex justify-center items-center'>
							<div className='w-fit p-5 absolute'>
								<i className='text-[#ccc] text-8xl bx bxs-camera-plus'></i>
							</div>
						</div>
					) : (
						<div className='w-full h-full object-cover border-dashed border-5 border-grey text-white rounded-2xl'>
							<img
								className='w-full h-full rounded-2xl'
								src={fileService.getFileUrl(company?.banner as string)}
							/>
						</div>
					)}
					<div
						onClick={(e) => {
							e.stopPropagation();
							setType('logo');
						}}
						className='absolute flex items-center justify-center cursor-pointer bottom-0 translate-y-1/2'
					>
						{!company?.image ? (
							<div className='flex justify-center items-center p-5 left-[150px] rounded-full border-dashed border-5 border-grey bg-white w-60 h-60'>
								<i className='text-[#ccc] text-8xl bx bxs-camera-plus'></i>
							</div>
						) : (
							<div className='left-5'>
								<img
									className='rounded-full border-dashed border-5 border-grey bg-white w-60 h-60 object-cover'
									src={fileService.getFileUrl(company?.image as string)}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='mt-10 my-10'>
				<div className='grid grid-cols-12 gap-5'>
					<div className='col-span-8'>
						<Formik
							initialValues={
								{
									name: company?.name,
									description: company?.description || '',
									address: company?.address,
									url: company?.url,
									companySize: company?.companySize,
									mapPosition:
										company?.mapPosition ||
										JSON.stringify({
											lat: 0,
											lng: 0,
										}),
								} as updateCompanyDTO
							}
							onSubmit={handleSubmit}
							validationSchema={validationSchema}
						>
							{({ values, handleChange, errors, setFieldValue, handleSubmit }) => (
								<form onSubmit={handleSubmit}>
									<Card className='w-full p-5'>
										<CardHeader>
											<h1 className='font-bold text-2xl'>Thông Tin Cơ Bản</h1>
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
														position={JSON.parse(values.mapPosition) as LatLngExpression}
														setPosition={(position: LatLngExpression) => {
															setFieldValue('mapPosition', JSON.stringify(position));
														}}
														draggable
													/>
												</div>
											</div>
										</CardBody>
										<Divider />
										<CardFooter className='flex justify-end'>
											<Button type='submit' color='primary'>
												Lưu
											</Button>
										</CardFooter>
									</Card>
								</form>
							)}
						</Formik>
						<UploadImageModal
							companyId={params.id}
							type={type}
							setType={setType}
							isOpen={isOpen}
							onOpenChange={onOpenChange}
						/>
					</div>
					<div className='col-span-4'>
						<Card className='w-full p-5'>
							<CardHeader>
								<h1 className='font-bold text-2xl'>Các Nhân Viên</h1>
							</CardHeader>
							<Divider />
							<CardBody></CardBody>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
export default CreateCompany;
